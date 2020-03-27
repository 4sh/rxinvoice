import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvoiceModel} from "../../../../models/invoice.model";
import {DownloadInvoiceService} from '../../../services/download-invoice.service';
import {InvoiceService} from '../../../services/invoice.service';

@Component({
    selector: 'dashboard-ticket',
    templateUrl: './dashboard-ticket.component.html',
    styleUrls: ['./dashboard-ticket.component.scss']
})
export class DashboardTicketComponent implements OnInit {

    @Input()
    public invoice: InvoiceModel;
    @Output()
    public invoiceStatusUpdateEvent: EventEmitter<InvoiceModel> = new EventEmitter<InvoiceModel>();

    public popupOpened: boolean;
    public statusClass: string;


    constructor(private downloadService: DownloadInvoiceService,
                private invoiceService: InvoiceService) {
    }

    ngOnInit() {
        this.statusClass = this.getClassFromStatus();
    }

    public downloadInvoice(invoice) {
        this.downloadService.downloadInvoice(invoice);
    }

    private getClassFromStatus() {
        return 'status-' + this.invoice.status.toLowerCase();
    }

    public openPopup(): void {
        this.popupOpened = true;
    }

    public updateInvoice(): void {
        this.invoiceService.saveInvoice(this.invoice)
            .subscribe(() => {
                this.closeQuickUpdate();
                this.invoiceStatusUpdateEvent.emit(this.invoice)
            });
    }

    public closeQuickUpdate(): void {
        this.popupOpened = false;
    }

    public isDraftInvoice(): boolean {
        return this.invoiceService.isDraftInvoice(this.invoice.status);
    }
}
