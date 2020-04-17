package rxinvoice.dao;

import com.mongodb.QueryBuilder;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.factory.Component;
import restx.jongo.JongoCollection;
import rxinvoice.domain.company.Company;
import rxinvoice.domain.company.SellerSettings;
import rxinvoice.jongo.MoreJongos;
import rxinvoice.service.company.CompanyService;

import javax.inject.Named;
import java.util.Optional;

import static rxinvoice.utils.MoreJ8Preconditions.checkPresent;

@Component
public class CompanyDao {

    private static final Logger logger = LoggerFactory.getLogger(CompanyService.class);

    private final JongoCollection companies;

    public CompanyDao(@Named("companies") JongoCollection companies) {
        this.companies = companies;
    }

    public long countBySiren(String siren) {
        return this.companies.get().count("{siren: #}", siren);
    }

    public long countAll() {
        return this.companies.get().count();
    }

    public Company createCompany(Company company) {
        logger.debug("Create new company: {}", company);
        this.companies.get().save(company);
        return company;
    }

    public Company updateCompany(Company company) {
        logger.debug("Update company: {}", company);
        this.companies.get().save(company);
        return company;
    }

    public SellerSettings updateSellerSettings(String companyKey,
                                               SellerSettings sellerSettings) {
        logger.debug("Update seller settings for company {} with {}", companyKey, sellerSettings);
        this.companies.get()
                .update("{_id: #}", companyKey)
                .with("{$set: {sellerSettings : #}}", sellerSettings);
        return sellerSettings;
    }

    public Company getByKey(String key) {
        return checkPresent(this.findByKey(key), String.format("Company not found for key %s", key));
    }

    public Optional<Company> findByKey(String key) {
        return Optional.ofNullable(companies.get().findOne(new ObjectId(key)).as(Company.class));
    }

    public Iterable<Company> findCompanies(Optional<String> queryOptional) {
        QueryBuilder queryBuilder = QueryBuilder.start();
        queryOptional.ifPresent(query -> queryBuilder.and("name").is(MoreJongos.containsIgnoreCase(query)).get());
        return this.companies.get()
                .find(queryBuilder.get().toString())
                .sort("{name: 1}")
                .as(Company.class);
    }

    public void deleteByKey(String key) {
        this.companies.get().remove(new ObjectId(key));
    }
}
