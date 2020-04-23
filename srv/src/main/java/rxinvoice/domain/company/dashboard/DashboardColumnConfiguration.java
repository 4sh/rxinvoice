package rxinvoice.domain.company.dashboard;

import rxinvoice.domain.invoice.Status;

public class DashboardColumnConfiguration {

    private boolean actionRequired;
    private boolean disabled;
    private String title;
    private Status invoiceStatus;

    @Override
    public String toString() {
        return "DashboardColumnConfiguration{" +
                "actionRequired=" + actionRequired +
                ", disabled=" + disabled +
                ", title='" + title + '\'' +
                ", invoiceStatus=" + invoiceStatus +
                '}';
    }

    public boolean isActionRequired() {
        return actionRequired;
    }

    public DashboardColumnConfiguration setActionRequired(boolean actionRequired) {
        this.actionRequired = actionRequired;
        return this;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public DashboardColumnConfiguration setDisabled(boolean disabled) {
        this.disabled = disabled;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public DashboardColumnConfiguration setTitle(String title) {
        this.title = title;
        return this;
    }

    public Status getInvoiceStatus() {
        return invoiceStatus;
    }

    public DashboardColumnConfiguration setInvoiceStatus(Status invoiceStatus) {
        this.invoiceStatus = invoiceStatus;
        return this;
    }
}
