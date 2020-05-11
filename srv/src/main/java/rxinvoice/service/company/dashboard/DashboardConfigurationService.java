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

    public Iterable<DashboardConfiguration> findDashboardConfigurations(String companyId, CompanyRole companyRole) {
        if (CompanyRole.DIRECTOR.equals(companyRole)) {
            return this.dashboardConfigurationDao.findCompanyDashboards(companyId);
        }
        return this.dashboardConfigurationDao.findCompanyDashboardsForRoles(companyId, companyRole);
    }
}
