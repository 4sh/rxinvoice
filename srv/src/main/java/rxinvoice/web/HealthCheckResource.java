package rxinvoice.web;

import restx.annotations.GET;
import restx.annotations.RestxResource;
import restx.factory.Component;
import restx.security.PermitAll;
import rxinvoice.service.company.CompanyService;

@Component
@RestxResource
public class HealthCheckResource {

    private final CompanyService companyService;

    public HealthCheckResource(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PermitAll
    @GET("/health-check")
    public Long checkSystemStatus() {
        return this.companyService.countCompanies();
    }


}
