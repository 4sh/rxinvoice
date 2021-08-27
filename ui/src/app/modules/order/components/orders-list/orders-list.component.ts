import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../../domain/order/order";
import {DownloadInvoiceService} from "../../../invoice/services/download-invoice.service";

@Component({
    selector: 'orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

    @Input() orders: Array<Order>;
    @Input() isPending: boolean;

    constructor(private downloadService: DownloadInvoiceService) {
    }

    ngOnInit(): void {
    }

    public downloadInvoice(invoice): void {
        this.downloadService.downloadInvoice(invoice);
    }
}
