import {Component, Input, OnInit} from '@angular/core';
import {InvoiceModel} from "../../../../models/invoice.model";
import {DownloadInvoiceService} from '../../../services/download-invoice.service';
import {InvoiceService} from '../../../services/invoice.service';
import {DashboardEventBusService} from '../../../services/dashboard-event-bus.service';
import {ModalService} from '../../modal/modal-service.service';
import {InvoiceEditionPopupComponent} from '../../invoice-edition-popup/invoice-edition-popup.component';
import {switchMap} from 'rxjs/operators';
import {InvoiceStatusesWorkflow} from '../../../../models/invoice-status.type';

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

    public statusClass: string;
    public quickActionLabel: string;
    public quickActionVisible: boolean;

    constructor(private downloadService: DownloadInvoiceService,
                private modalService: ModalService,
                private dashboardEventBusService: DashboardEventBusService,
                private invoiceService: InvoiceService) {
    }

    ngOnInit() {
        this.statusClass = this.buildClassFromStatus();
        this.quickActionLabel = this.buildQuickActionLabel();
        this.quickActionVisible = this.setQuickActionVisibility();
    }

    private buildClassFromStatus(): string {
        return 'status-' + this.invoice.status.toLowerCase();
    }

    private buildQuickActionLabel(): string {
        return 'dashboard.ticket.quick.action.' + this.invoice.status;
    }

    private setQuickActionVisibility(): boolean  {
        return InvoiceStatusesWorkflow[this.invoice.status].quickActionEnabled;
    }

    public quickAction(): void {
        let fromStatus = this.invoice.status;
        this.invoice.status = InvoiceStatusesWorkflow[this.invoice.status].authorizedTargets[0];
        this.invoiceService.updateInvoiceStatus(this.invoice, this.invoice.status)
            .subscribe((invoice: InvoiceModel) => {
                this.dashboardEventBusService.publish(fromStatus);
                this.dashboardEventBusService.publish(invoice.status);
            });
    }

    public openPopup(): void {
        let fromStatus = this.invoice.status;
        this.modalService
            .open(InvoiceEditionPopupComponent, this.invoice)
            .onResult()
            .pipe(switchMap(() => this.invoiceService.updateInvoiceStatus(this.invoice, this.invoice.status)))
            .subscribe((invoice: InvoiceModel) => {
                this.dashboardEventBusService.publish(fromStatus);
                this.dashboardEventBusService.publish(invoice.status);
            });
    }

    public downloadInvoice(invoice) {
        this.downloadService.downloadInvoice(invoice);
    }

    public isDraftInvoice(): boolean {
        return this.invoiceService.isDraftInvoice(this.invoice.status);
    }

}
