import {InvoiceStatusType} from '../../../models/invoice-status.type';
import {InvoiceSearchFilterModel} from '../../../models/invoice-search-filter.model';

export class DashboardColumnConfiguration {

    public disabled: boolean;
    public title: string;
    /** Status linked to the column, it will be applied to any invoice dropped onto this column. */
    public invoiceStatus: InvoiceStatusType;
    public invoiceSearchFilter: InvoiceSearchFilterModel = new InvoiceSearchFilterModel();

    constructor(title: string, invoiceStatus: InvoiceStatusType, disabled?: boolean) {
        this.title = title;
        this.invoiceStatus = invoiceStatus;
        this.disabled = disabled;
        this.invoiceSearchFilter.statuses = [invoiceStatus];
    }
}