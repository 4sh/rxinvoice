import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvoiceModel} from "../../../../models/invoice.model";
import {isNumber} from "util";
import {InvoiceStatusUpdateEvent} from '../InvoiceStatusUpdateEvent';
import {DndDropEvent} from 'ngx-drag-drop';
import {InvoiceService} from '../../../services/invoice.service';
import {DashboardColumnConfiguration} from '../dashboard-column-configuration';
import {InvoiceStatusesWorkflow, InvoiceStatusType} from '../../../../models/invoice-status.type';
import {DashboardEventBusService} from '../../../services/dashboard-event-bus.service';
import {DashboardColumnObserver} from '../dashboard-column-observer';
import {ModalService} from '../../modal/modal-service.service';
import {InvoiceEditionPopupComponent} from '../../invoice-edition-popup/invoice-edition-popup.component';
import {Observable} from 'rxjs';

@Component({
    selector: 'dashboard-column',
    templateUrl: './dashboard-column.component.html',
    styleUrls: ['./dashboard-column.component.scss']
})
export class DashboardColumnComponent implements OnInit, DashboardColumnObserver {

    @Input()
    public columnConfiguration: DashboardColumnConfiguration;
    @Output()
    public columnUpdated: EventEmitter<InvoiceStatusUpdateEvent> = new EventEmitter<InvoiceStatusUpdateEvent>();

    public invoiceList: Array<InvoiceModel> = [];

    constructor(private invoiceService: InvoiceService,
                private modalService: ModalService,
                private dashboardEventBusService: DashboardEventBusService) {
    }

    ngOnInit() {
        this.dashboardEventBusService.register(this);
        this.loadInvoices();
    }

    public loadInvoices() {
        this.invoiceService.fetchInvoiceList(this.columnConfiguration.invoiceSearchFilter)
            .subscribe(invoices => this.invoiceList = invoices);
    }

    public getAmount(): number {
        if (this.invoiceList) {
            return this.invoiceList
                .filter(invoice => isNumber(invoice.grossAmount))
                .map(invoice => invoice.grossAmount)
                .reduce((a, b) => a + b, 0);
        }
    }

    public onDrop($event: DndDropEvent): void {
        let invoice = $event.data;
        let fromStatus = invoice.status;
        if (this.columnConfiguration.actionRequired) {
            this.modalService
                .open(InvoiceEditionPopupComponent, invoice)
                .onResult()
                .subscribe(() => this.onInvoiceUpdated(invoice, fromStatus));
        } else {
            this.onInvoiceUpdated(invoice, fromStatus);
        }
    }

    private onInvoiceUpdated(invoice, fromStatus) {
        this.invoiceService.updateInvoiceStatus(invoice, this.columnConfiguration.invoiceStatus)
            .subscribe(() => {
                this.dashboardEventBusService.publish(fromStatus);
                this.dashboardEventBusService.publish(invoice.status);
            });
    }

    public getDropAllowedTypes(): Array<InvoiceStatusType> {
        return [this.columnConfiguration.invoiceStatus]
            .concat(InvoiceStatusesWorkflow[this.columnConfiguration.invoiceStatus].authorizedSources);
    }

    getInvoiceStatusType(): InvoiceStatusType {
        return this.columnConfiguration.invoiceStatus;
    }

    getCallback(): () => void {
        return this.loadInvoices;
    }
}
