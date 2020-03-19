package rxinvoice.service.company;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import com.google.common.base.Strings;
import com.google.common.eventbus.EventBus;
import com.mongodb.QueryBuilder;
import org.bson.types.ObjectId;
import org.joda.time.DateTime;
import org.jongo.Distinct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.Status;
import restx.exceptions.RestxErrors;
import restx.factory.Component;
import restx.jongo.JongoCollection;
import rxinvoice.AppModule;
import rxinvoice.domain.Activity;
import rxinvoice.domain.company.*;
import rxinvoice.domain.User;
import rxinvoice.jongo.MoreJongos;
import rxinvoice.service.errors.CompanyErrors;

import javax.inject.Named;

import static rxinvoice.AppModule.Roles.ADMIN;


@Component
public class CompanyService {

    private static final Logger logger = LoggerFactory.getLogger(CompanyService.class);

    private final JongoCollection companies;
    private final JongoCollection invoices;
    private final SellerCompanyMetricsService sellerCompanyMetricsService;
    private final EventBus eventBus;
    private final RestxErrors restxErrors;

    public CompanyService(@Named("companies") JongoCollection companies,
                          @Named("invoices") JongoCollection invoices,
                          SellerCompanyMetricsService sellerCompanyMetricsService,
                          EventBus eventBus,
                          RestxErrors restxErrors) {
        this.companies = companies;
        this.invoices = invoices;
        this.sellerCompanyMetricsService = sellerCompanyMetricsService;
        this.eventBus = eventBus;
        this.restxErrors = restxErrors;
    }

    public Iterable<Company> findCompanies(Optional<String> queryOptional) {
        String sellerCompanyKey = AppModule.currentUser().getCompanyRef();
        if (sellerCompanyKey == null) {
            logger.error("Seller company ref not found for use: {}", AppModule.currentUser());
        }
        Optional<SellerCompanyMetrics> optionalMetrics = this.sellerCompanyMetricsService.findBySellerRef(sellerCompanyKey);

        QueryBuilder queryBuilder = QueryBuilder.start();

        queryOptional.ifPresent(query -> queryBuilder.and("name").is(MoreJongos.containsIgnoreCase(query)).get());

        Stream<Company> companyStream = StreamSupport.stream(this.companies.get()
                .find(queryBuilder.get().toString())
                .sort("{name: 1}")
                .as(Company.class).spliterator(), false);

        return companyStream.map(company -> company.setFiscalYearMetricsMap(
                optionalMetrics
                        .map(companyMetrics -> companyMetrics.getBuyerCompaniesMetrics().get(company.getKey()))
                        .orElse(SellerCompanyMetrics.buildEmptyMetricsMap())))
                .collect(Collectors.toList());
    }


    public Iterable<Company> findBuyerCompanies() {
        /* TODO: use aggregate to remove for each in java code
        db.invoices.aggregate({
            $group : {
                _id : "1",
                buyers : { $addToSet: "$buyer._id" }
            }
        })
         */
        Distinct distinct = invoices.get().distinct("buyer");
        User user = AppModule.currentUser();
        if (!user.getPrincipalRoles().contains(ADMIN)) {
            distinct = distinct.query("{ seller._id: #}", new ObjectId(user.getCompanyRef()));
        }
        List<ObjectId> buyers = new ArrayList<ObjectId>();
        for (Company company : distinct.as(Company.class)) {
            if (company.getKey() != null) {
                buyers.add(new ObjectId(company.getKey()));
            }
        }
        return companies.get().find("{_id: {$in:#}}", buyers).as(Company.class);
    }

    public Iterable<Company> findSellerCompanies() {
        Distinct distinct = invoices.get().distinct("seller");
        User user = AppModule.currentUser();
        if (!user.getPrincipalRoles().contains(ADMIN)) {
            distinct = distinct.query("{ seller._id: #}", new ObjectId(user.getCompanyRef()));
        }
        List<ObjectId> buyers = new ArrayList<ObjectId>();
        for (Company company : distinct.as(Company.class)) {
            if (company.getKey() != null) {
                buyers.add(new ObjectId(company.getKey()));
            }
        }
        return companies.get().find("{_id: {$in:#}}", buyers).as(Company.class);
    }

    public Optional<Company> findCompanyByKeyWithMetrics(String key, String sellerCompanyKey) {
        Optional<Company> companyOptional = findCompanyByKey(key);
        companyOptional.ifPresent(company -> {
            Optional<SellerCompanyMetrics> metricsOptional = sellerCompanyMetricsService.findBySellerRef(sellerCompanyKey);
            company.setFiscalYearMetricsMap(metricsOptional
                    .map(companyMetrics -> companyMetrics.getBuyerCompaniesMetrics().get(key))
                    .orElse(SellerCompanyMetrics.buildEmptyMetricsMap()));
        });
        return companyOptional;
    }

    public Optional<Company> findCompanyByKey(String key) {
        return Optional.ofNullable(companies.get().findOne(new ObjectId(key)).as(Company.class));
    }

    public Iterable<Company> findBuyers() {
        return companies.get().find().as(Company.class);
    }

    public Company createCompany(Company company) {
        checkCodeUniqueness(company);
        company = company.setCreationDate(DateTime.now());
        saveCompany(company);
        eventBus.post(Activity.newCreate(company, AppModule.currentUser()));
        return company;
    }

    private void checkCodeUniqueness(Company company) {
        if (this.companies.get().count("{code: #}", company.getCode()) > 0) {
            throw this.restxErrors.on(CompanyErrors.CompanyExitingCodeError.class)
                    .set(CompanyErrors.CompanyExitingCodeError.CODE, company.getCode())
                    .set(CompanyErrors.CompanyExitingCodeError.NAME, company.getName())
                    .raise();
        }
    }

    public void saveCompany(Company company) {
        for (Customer customer : company.getCustomers().values()) {
            for (Business business : customer.getBusinessList()) {
                if (Strings.isNullOrEmpty(business.getReference())) {
                    business.setReference(UUID.randomUUID().toString());
                }
            }
        }
        companies.get().save(company);
    }

    public Company updateCompany(Company company) {
        saveCompany(company);
        eventBus.post(Activity.newUpdate(company, AppModule.currentUser()));
        return company;
    }

    public Status deleteCompany(String key) {
        // TODO check that company is not referenced by users

        companies.get().remove(new ObjectId(key));
        eventBus.post(Activity.newDelete(new Company().setKey(key), AppModule.currentUser()));
        return Status.of("deleted");
    }

    public long countCompanies() {
        return this.companies.get().count();
    }
}
