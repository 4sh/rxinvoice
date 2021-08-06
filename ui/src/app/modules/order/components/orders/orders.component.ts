import {Component, OnInit} from '@angular/core';
import {Order} from "../../../../domain/order/order";
import {OrderService} from "../../services/order.service";

@Component({
    selector: 'orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

    public orders: Order[]
    public filterString = 'date';
    public isPending = true;


    constructor(private orderService: OrderService) {
    }

    ngOnInit(): void {
        this.research()
    }

    research() {
        this.orders = [];
        this.isPending = true;
        this.orderService.fetchOrders()
            .subscribe(
                (orders) => {
                    this.orders = orders;
                    this.isPending = false;
                },
                () => this.isPending = false
            );
    }

}
