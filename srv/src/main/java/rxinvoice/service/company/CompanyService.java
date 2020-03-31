package rxinvoice.service.company;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import com.google.common.base.Strings;
import com.google.common.eventbus.EventBus;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.Status;
import restx.exceptions.RestxErrors;
import restx.factory.Component;
import rxinvoice.AppModule;
import rxinvoice.dao.CompanyDao;
import rxinvoice.domain.Activity;
import rxinvoice.domain.company.*;
import rxinvoice.service.errors.CompanyErrors;


@Component
public class CompanyService {

    private static final Logger logger = LoggerFactory.getLogger(CompanyService.class);

    private final CompanyDao companyDao;
    private final CommercialRelationshipService commercialRelationshipService;
    private final EventBus eventBus;
    private final RestxErrors restxErrors;

    public CompanyService(CompanyDao companyDao,
                          CommercialRelationshipService commercialRelationshipService,
                          EventBus eventBus,
                          RestxErrors restxErrors) {
        this.companyDao = companyDao;
        this.commercialRelationshipService = commercialRelationshipService;
        this.eventBus = eventBus;
        this.restxErrors = restxErrors;
    }

    public Iterable<Company> findCompanies(Optional<String> queryOptional) {
        String sellerCompanyKey = AppModule.currentUser().getCompanyRef();
        if (sellerCompanyKey == null) {
            logger.error("Seller company ref not found for use: {}", AppModule.currentUser());
        }
        Iterable<Company> companies = this.companyDao.findCompanies(queryOptional);
        Iterable<CommercialRelationship> commercialRelationships = this.commercialRelationshipService.findAll();

        Map<String, CommercialRelationship> commercialRelationshipMap = new HashMap<>();

        for(CommercialRelationship commercialRelationship : commercialRelationships) {
            commercialRelationshipMap.put(commercialRelationship.getCustomerRef(), commercialRelationship);
        }

        return StreamSupport.stream(companies.spliterator(), false).peek(company ->
                company.setCommercialRelationship(commercialRelationshipMap.get(company.getKey())))
                .collect(Collectors.toList());
    }

    public Optional<Company> findCompanyByKeyWithCommercialRelation(String key) {
        Optional<Company> companyOptional = this.companyDao.findByKey(key);
        companyOptional.ifPresent(company -> {
            company.setCommercialRelationship(this.commercialRelationshipService.findByCustomer(key));
        });
        return companyOptional;
    }

    public Company createCompany(Company company) {
        this.checkCompanyUniqueness(company);
        this.saveCompany(company.setCreationDate(DateTime.now()));
        this.commercialRelationshipService.create(company);
        eventBus.post(Activity.newCreate(company, AppModule.currentUser()));
        return company;
    }

    public Company updateCompany(Company company) {
        saveCompany(company);
        this.commercialRelationshipService.update(company.getCommercialRelationship());
        eventBus.post(Activity.newUpdate(company, AppModule.currentUser()));
        return company;
    }

    public Status deleteCompany(String key) {
        this.companyDao.deleteByKey(key);
        eventBus.post(Activity.newDelete(new Company().setKey(key), AppModule.currentUser()));
        return Status.of("deleted");
    }

    public long countCompanies() {
        return this.companyDao.countAll();
    }

    private void saveCompany(Company company) {
        for (Business business : company.getCommercialRelationship().getBusinessList()) {
            if (Strings.isNullOrEmpty(business.getReference())) {
                business.setReference(UUID.randomUUID().toString());
            }
        }
        if (null == company.getKey()) {
            this.companyDao.createCompany(company);
        } else {
            this.companyDao.updateCompany(company);
        }
    }

    private void checkCompanyUniqueness(Company company) {
        if (this.companyDao.countBySiren(company.getSiren()) > 0) {
            throw this.restxErrors.on(CompanyErrors.CompanyExistingSirenError.class)
                    .set(CompanyErrors.CompanyExistingSirenError.SIREN, company.getSiren())
                    .set(CompanyErrors.CompanyExistingSirenError.NAME, company.getName())
                    .raise();
        }
    }
}
