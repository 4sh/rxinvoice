import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../../domain/order/order";

@Component({
    selector: 'orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

    @Input() orders: Array<Order>;
    @Input() isPending: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

}
