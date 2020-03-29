import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvoiceModel} from "../../../../models/invoice.model";
import {isNumber} from "util";
import {InvoiceChangeEvent} from '../Invoice-change-event';
import {DndDropEvent} from 'ngx-drag-drop';
import {InvoiceService} from '../../../services/invoice.service';
import {DashboardColumnConfiguration} from '../dashboard-column-configuration';

@Component({
    selector: 'dashboard-column',
    templateUrl: './dashboard-column.component.html',
    styleUrls: ['./dashboard-column.component.scss']
})
export class DashboardColumnComponent implements OnInit {

    @Input()
    public columnConfiguration: DashboardColumnConfiguration;
    @Output()
    public columnUpdated: EventEmitter<InvoiceChangeEvent> = new EventEmitter<InvoiceChangeEvent>();

    public invoiceList: Array<InvoiceModel> = [];

    constructor(private invoiceService: InvoiceService) {
    }

    ngOnInit() {
        this.loadInvoices();
    }

    private loadInvoices() {
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
        this.invoiceService.updateInvoiceStatus($event.data, this.columnConfiguration.invoiceStatus)
            .subscribe(() => this.loadInvoices());
    }

    public onDragEnded($event: InvoiceChangeEvent): void {
        if ($event.fromStatus === this.columnConfiguration.invoiceStatus) {
            this.loadInvoices();
        }
    }
}
