import {Component, Input, OnInit} from '@angular/core';
import {InvoiceModel} from "../../../../models/invoice.model";

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

    constructor() {
    }

    ngOnInit() {
    }

}
