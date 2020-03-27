import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvoiceModel} from "../../../../models/invoice.model";
import {isNumber} from "util";
import {InvoiceStatusType} from '../../../../models/invoice-status.type';
import {InvoiceChangeEvent} from '../Invoice-change-event';

@Component({
    selector: 'dashboard-column',
    templateUrl: './dashboard-column.component.html',
    styleUrls: ['./dashboard-column.component.scss']
})
export class DashboardColumnComponent implements OnInit {

    @Input()
    public disabled: boolean;
    @Input()
    public title: string;
    @Input()
    public invoiceList: Array<InvoiceModel>;
    @Output()
    public columnUpdated: EventEmitter<InvoiceChangeEvent> = new EventEmitter<InvoiceChangeEvent>();

    constructor() {
    }

    ngOnInit() {
    }

    public getAmount(): number {
        if (this.invoiceList) {
            return this.invoiceList
                .filter(invoice => isNumber(invoice.grossAmount))
                .map(invoice => invoice.grossAmount)
                .reduce((a, b) => a + b, 0);
        }
    }

    public invoiceUpdated(invoiceChangeEvent: InvoiceChangeEvent): void {
        this.columnUpdated.emit(invoiceChangeEvent);
    }
}
