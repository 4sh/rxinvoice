package rxinvoice.domain.company.dashboard;

import java.util.List;

public class DashboardConfiguration {

    private String title;
    private String companyRef;
    private String role;
    private List<DashboardColumnConfiguration> columnConfigurations;

    @Override
    public String toString() {
        return "DashboardConfiguration{" +
                "title='" + title + '\'' +
                ", companyRef='" + companyRef + '\'' +
                ", role='" + role + '\'' +
                ", columnConfigurations=" + columnConfigurations +
                '}';
    }

    public String getTitle() {
        return title;
    }

    public DashboardConfiguration setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getCompanyRef() {
        return companyRef;
    }

    public DashboardConfiguration setCompanyRef(String companyRef) {
        this.companyRef = companyRef;
        return this;
    }

    public String getRole() {
        return role;
    }

    public DashboardConfiguration setRole(String role) {
        this.role = role;
        return this;
    }

    public List<DashboardColumnConfiguration> getColumnConfigurations() {
        return columnConfigurations;
    }

    public DashboardConfiguration setColumnConfigurations(List<DashboardColumnConfiguration> columnConfigurations) {
        this.columnConfigurations = columnConfigurations;
        return this;
    }
}
