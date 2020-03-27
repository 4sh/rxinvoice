import {InvoiceStatusType} from '../../../models/invoice-status.type';
import {InvoiceModel} from '../../../models/invoice.model';
import {InvoiceService} from '../../services/invoice.service';

export abstract class DashboardCommons {

    protected statusColumnMap: Map<InvoiceStatusType, Array<InvoiceModel>> = new Map<InvoiceStatusType, Array<InvoiceModel>>();

    protected invoiceService: InvoiceService;

    protected constructor(invoiceService: InvoiceService) {
        this.invoiceService = invoiceService;
    }

    protected fetchColumn(invoiceStatus: InvoiceStatusType): void {
        const invoiceList = this.statusColumnMap.get(invoiceStatus);
        invoiceList.splice(0, invoiceList.length);
        this.invoiceService.fetchInvoices({statuses: invoiceStatus})
            .subscribe(invoices => invoiceList.push(...invoices));
    }

}