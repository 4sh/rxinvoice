package rxinvoice.web.rest;

import restx.annotations.GET;
import restx.annotations.RestxResource;
import restx.factory.Component;
import rxinvoice.AppModule;
import rxinvoice.domain.User;
import rxinvoice.domain.company.dashboard.DashboardConfiguration;
import rxinvoice.service.company.dashboard.DashboardConfigurationService;

import static restx.common.MorePreconditions.checkEquals;

@Component
@RestxResource
public class DashboardConfigurationResource {

    private final DashboardConfigurationService dashboardConfigurationService;

    public DashboardConfigurationResource(DashboardConfigurationService dashboardConfigurationService) {
        this.dashboardConfigurationService = dashboardConfigurationService;
    }

    @GET("/companies/{companyId}/dashboards")
    public Iterable<DashboardConfiguration> getDashboardConfigurations(String companyId) {
        User connectedUser = AppModule.currentUser();
        checkEquals("companyId", companyId, "connected user company", connectedUser.getCompanyRef());
        return this.dashboardConfigurationService.findDashboardConfigurations(
                connectedUser.getCompanyRef(),
                connectedUser.getCompanyRoles());
    }

}
