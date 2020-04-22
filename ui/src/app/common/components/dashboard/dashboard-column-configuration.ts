import {InvoiceStatusType} from '../../../domain/invoice/invoice-status.type';
import {InvoiceSearchFilter} from '../../../domain/invoice/invoice-search-filter';

export class DashboardColumnConfiguration {

    public actionRequired: boolean;
    public disabled: boolean;
    public title: string;
    /** Status linked to the column, it will be applied to any invoice dropped onto this column. */
    public invoiceStatus: InvoiceStatusType;
    public invoiceSearchFilter: InvoiceSearchFilter = new InvoiceSearchFilter();

    constructor(title: string, invoiceStatus: InvoiceStatusType, disabled?: boolean, actionRequired?: boolean) {
        this.title = title;
        this.invoiceStatus = invoiceStatus;
        this.disabled = disabled;
        this.actionRequired = actionRequired;
        this.invoiceSearchFilter.statuses = [invoiceStatus];
    }
}