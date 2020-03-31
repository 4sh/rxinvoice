package rxinvoice.dao;

import com.mongodb.QueryBuilder;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import restx.factory.Component;
import restx.jongo.JongoCollection;
import rxinvoice.domain.company.Company;
import rxinvoice.jongo.MoreJongos;
import rxinvoice.service.company.CompanyService;

import javax.inject.Named;
import java.util.Optional;

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
