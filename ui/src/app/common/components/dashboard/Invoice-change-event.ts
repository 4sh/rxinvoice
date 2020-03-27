import {InvoiceStatusType} from '../../../models/invoice-status.type';
import {InvoiceModel} from '../../../models/invoice.model';

export class InvoiceChangeEvent {

    public fromStatus: InvoiceStatusType;
    public toStatus: InvoiceStatusType;
    public invoice: InvoiceModel;

    constructor(fromStatus: InvoiceStatusType, toStatus: InvoiceStatusType, invoice: InvoiceModel) {
        this.fromStatus = fromStatus;
        this.toStatus = toStatus;
        this.invoice = invoice;
    }
}