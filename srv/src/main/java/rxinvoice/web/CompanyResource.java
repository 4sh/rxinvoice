package rxinvoice.web;

import restx.Status;
import restx.WebException;
import restx.annotations.*;
import restx.factory.Component;
import restx.http.HttpStatus;
import restx.security.RolesAllowed;
import rxinvoice.AppModule;
import rxinvoice.domain.company.SellerSettings;
import rxinvoice.domain.company.Company;
import rxinvoice.domain.User;
import rxinvoice.service.company.CompanyService;
import rxinvoice.service.invoice.InvoiceMetricsService;

import java.util.Optional;

import static restx.common.MorePreconditions.checkEquals;
import static rxinvoice.AppModule.Roles.ADMIN;
import static rxinvoice.AppModule.Roles.SELLER;

/**
 *
 */
@Component
@RestxResource
public class CompanyResource {

    private final CompanyService companyService;
    private final InvoiceMetricsService invoiceMetricsService;

    public CompanyResource(CompanyService companyService,
                           InvoiceMetricsService invoiceMetricsService) {
        this.companyService = companyService;
        this.invoiceMetricsService = invoiceMetricsService;
    }

    @RolesAllowed({ADMIN, SELLER})
    @GET("/companies")
    public Iterable<Company> findCompanies(Optional<String> query) {
        return companyService.findCompanies(query);
    }


    @GET("/companies/{key}")
    public Optional<Company> findCompanyByKey(String key) {
        // users can only get their own company except admin and sellers
        User user = AppModule.currentUser();
        if (!key.equals(user.getCompanyRef())
                && !user.getPrincipalRoles().contains(ADMIN)
                && !user.getPrincipalRoles().contains(SELLER)) {
            throw new WebException(HttpStatus.FORBIDDEN);
        }
        return companyService.findCompanyByKeyWithCommercialRelation(key);
    }


    @RolesAllowed({ADMIN, SELLER})
    @POST("/companies")
    public Company createCompany(Company company) {
        return companyService.createCompany(company);
    }

    @RolesAllowed({ADMIN, SELLER})
    @PUT("/companies/{key}")
    public Company updateCompany(String key, Company company) {
        checkEquals("key", key, "company.key", company.getKey());
        return companyService.updateCompany(company);
    }

    @RolesAllowed(ADMIN)
    @DELETE("/companies/{key}")
    public Status deleteCompany(String key) {
        return companyService.deleteCompany(key);
    }

    @RolesAllowed(ADMIN)
    @POST("/admin/companies/metrics/seller/:sellerCompanyKey")
    public void computeCompaniesMetrics(String sellerCompanyKey) {
        invoiceMetricsService.computeAllCompanyMetricsAsync(sellerCompanyKey);
    }

    @RolesAllowed({ADMIN, SELLER})
    @PUT("/companies/{sellerRef}/accountantConfiguration")
    public SellerSettings updateSellerSettings(String sellerRef, SellerSettings sellerSettings) {
        User user = AppModule.currentUser();
        if (user.isSeller() && !user.getCompanyRef().equals(sellerRef)) {
            throw new WebException(HttpStatus.FORBIDDEN,
                    String.format("Seller user %s is not part of company %s", user.getName(), sellerRef));
        }
        return companyService.updateSellerSettings(sellerRef, sellerSettings);
    }
}
