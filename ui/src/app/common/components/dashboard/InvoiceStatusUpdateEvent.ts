import {InvoiceStatusType} from '../../../models/invoice-status.type';
import {InvoiceModel} from '../../../models/invoice.model';

export class InvoiceStatusUpdateEvent {

    public fromStatus: InvoiceStatusType;
    public invoice: InvoiceModel;

    constructor(fromStatus: InvoiceStatusType, invoice: InvoiceModel) {
        this.fromStatus = fromStatus;
        this.invoice = invoice;
    }
}