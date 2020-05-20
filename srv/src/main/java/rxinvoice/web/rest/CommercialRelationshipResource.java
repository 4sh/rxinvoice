package rxinvoice.web.rest;

import restx.annotations.GET;
import restx.annotations.RestxResource;
import restx.factory.Component;
import restx.security.RolesAllowed;
import rxinvoice.domain.company.Company;
import rxinvoice.service.company.CompanyService;

import java.util.Optional;

import static rxinvoice.AppModule.Roles.ADMIN;
import static rxinvoice.AppModule.Roles.SELLER;

@Component
@RestxResource
public class CommercialRelationshipResource {

    private final CompanyService companyService;

    public CommercialRelationshipResource(CompanyService companyService) {
        this.companyService = companyService;
    }

    @RolesAllowed({ADMIN, SELLER})
    @GET("/customers/:customerRef")
    public Optional<Company> findCustomer(String customerRef) {
        return this.companyService.findCustomerCompanyByKeyWithCommercialRelation(customerRef);
    }

}
