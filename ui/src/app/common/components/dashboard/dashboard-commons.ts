import {InvoiceStatusType} from '../../../models/invoice-status.type';
import {InvoiceModel} from '../../../models/invoice.model';
import {InvoiceService} from '../../services/invoice.service';
import {InvoiceChangeEvent} from './Invoice-change-event';

export abstract class DashboardCommons {

    protected statusColumnMap: Map<InvoiceStatusType, Array<InvoiceModel>> = new Map<InvoiceStatusType, Array<InvoiceModel>>();

    protected invoiceService: InvoiceService;

    protected constructor(invoiceService: InvoiceService) {
        this.invoiceService = invoiceService;
    }

    protected fetchColumn(invoiceStatus: InvoiceStatusType): void {
        const invoiceList = this.statusColumnMap.get(invoiceStatus);
        if (invoiceList) {
            if (invoiceList.length > 0) {
                invoiceList.splice(0, invoiceList.length);
            }
            this.invoiceService.fetchInvoices({statuses: invoiceStatus})
                .subscribe(invoices => invoiceList.push(...invoices));
        }
    }

    protected columnUpdated(invoiceChangeEvent: InvoiceChangeEvent): void {
        this.fetchColumn(invoiceChangeEvent.fromStatus);
        if (invoiceChangeEvent.fromStatus !== invoiceChangeEvent.toStatus) {
            this.fetchColumn(invoiceChangeEvent.toStatus);
        }
    }
}