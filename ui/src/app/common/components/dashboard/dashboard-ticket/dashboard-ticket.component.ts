import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InvoiceModel} from "../../../../models/invoice.model";
import {DownloadInvoiceService} from '../../../services/download-invoice.service';
import {InvoiceService} from '../../../services/invoice.service';
import {InvoiceChangeEvent} from '../Invoice-change-event';
import {InvoiceStatusType} from '../../../../models/invoice-status.type';

@Component({
    selector: 'dashboard-ticket',
    templateUrl: './dashboard-ticket.component.html',
    styleUrls: ['./dashboard-ticket.component.scss']
})
export class DashboardTicketComponent implements OnInit {

    @Input()
    public invoice: InvoiceModel;
    @Input()
    public disabled: boolean;
    @Output()
    public invoiceUpdated: EventEmitter<InvoiceChangeEvent> = new EventEmitter<InvoiceChangeEvent>();

    public popupOpened: boolean;
    public statusClass: string;
    private originalStatus: InvoiceStatusType;

    constructor(private downloadService: DownloadInvoiceService,
                private invoiceService: InvoiceService) {
    }

    ngOnInit() {
        this.statusClass = this.getClassFromStatus();
        this.originalStatus = this.invoice.status;
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
                this.invoiceUpdated.emit(new InvoiceChangeEvent(this.originalStatus, this.invoice.status, this.invoice));
            });
    }

    public closeQuickUpdate(): void {
        this.popupOpened = false;
    }

    public isDraftInvoice(): boolean {
        return this.invoiceService.isDraftInvoice(this.invoice.status);
    }

    public buildInvoiceChangeEvent(): InvoiceChangeEvent {
        return new InvoiceChangeEvent(this.originalStatus, this.invoice.status, this.invoice);
    }

    public onDragEnd($event: DragEvent): void {
        this.invoiceUpdated.emit(this.buildInvoiceChangeEvent());
    }
}
