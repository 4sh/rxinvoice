package rxinvoice.service.company.dashboard;

import restx.factory.Component;
import rxinvoice.domain.CompanyRole;
import rxinvoice.domain.company.dashboard.DashboardConfiguration;

import java.util.Collection;

@Component
public class DashboardConfigurationService {

    private final DashboardConfigurationDao dashboardConfigurationDao;

    public DashboardConfigurationService(DashboardConfigurationDao dashboardConfigurationDao) {
        this.dashboardConfigurationDao = dashboardConfigurationDao;
    }

    public Iterable<DashboardConfiguration> findDashboardConfigurations(String companyId, Collection<CompanyRole> roles) {
        Iterable<DashboardConfiguration> dashboards;
        if (roles.contains(CompanyRole.DIRECTOR)) {
            dashboards = this.dashboardConfigurationDao.findCompanyDashboards(companyId);
        } else {
            dashboards = this.dashboardConfigurationDao.findCompanyDashboardsForRoles(companyId, roles);
        }
        return dashboards;
    }
}
