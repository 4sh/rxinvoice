import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvoiceModel} from "../../../../models/invoice.model";
import {isNumber} from "util";

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
    public columnUpdated: EventEmitter<InvoiceModel> = new EventEmitter<InvoiceModel>();

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

    public invoiceUpdated(invoice: InvoiceModel): void {
        this.columnUpdated.emit(invoice);
    }
}
