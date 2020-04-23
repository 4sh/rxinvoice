package rxinvoice.service.company.dashboard;

import restx.factory.Component;
import restx.jongo.JongoCollection;
import rxinvoice.domain.CompanyRole;
import rxinvoice.domain.company.dashboard.DashboardConfiguration;

import javax.inject.Named;
import java.util.Collection;

@Component
public class DashboardConfigurationDao {

    private JongoCollection dashboardConfigurations;

    public DashboardConfigurationDao(@Named("dashboardConfigurations") JongoCollection dashboardConfigurations) {
        this.dashboardConfigurations = dashboardConfigurations;
    }

    public Iterable<DashboardConfiguration> findCompanyDashboards(String companyId) {
        return this.dashboardConfigurations.get()
                .find("{companyRef: #}", companyId)
                .as(DashboardConfiguration.class);
    }

    public Iterable<DashboardConfiguration> findCompanyDashboardsForRoles(String companyId,
                                                                          Collection<CompanyRole> roles) {
        return this.dashboardConfigurations.get()
                .find("{companyRef: #, role: {$in: #}}", companyId, roles)
                .as(DashboardConfiguration.class);
    }


}
