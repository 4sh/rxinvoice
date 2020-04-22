import {Invoice} from '../../../domain/invoice/invoice';
import {InvoiceStatusType} from '../../../domain/invoice/invoice-status.type';

export class InvoiceStatusUpdateEvent {

    public fromStatus: InvoiceStatusType;
    public invoice: Invoice;

    constructor(fromStatus: InvoiceStatusType, invoice: Invoice) {
        this.fromStatus = fromStatus;
        this.invoice = invoice;
    }
}