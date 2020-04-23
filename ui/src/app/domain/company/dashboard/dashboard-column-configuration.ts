import {InvoiceStatusType} from '../../invoice/invoice-status.type';

export class DashboardColumnConfiguration {

    public actionRequired: boolean;
    public disabled: boolean;
    public title: string;
    /** Status linked to the column, it will be applied to any invoice dropped onto this column. */
    public invoiceStatus: InvoiceStatusType;
}
