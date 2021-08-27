import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Order} from "../../../domain/order/order";
import {catchError, map, mergeMap} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {throwError} from "rxjs/internal/observable/throwError";
import {CustomerService} from "../../customer/services/customer.service";
import {Customer} from "../../../domain/company/customer";
import {InvoiceService} from "../../invoice/services/invoice.service";
import {Invoice} from "../../../domain/invoice/invoice";

@Injectable()
export class OrderService {

    private baseUrl = '/api/v1/orders';

    constructor(private http: HttpClient,
                private customerService: CustomerService,
                private invoiceService: InvoiceService) {
    }

    fetchOrders(): Observable<Order[]> {
        return this.http.get(this.baseUrl).pipe(
            mergeMap((orders: any) => this.customerService.fetchCustomers().pipe(
                map((customers: Customer[]) => {
                    orders = orders.map((order: any) => {
                        order.customer = customers.find((customer: Customer) => customer._id == order.customerRef);
                        return order;
                    });
                    return plainToClass(Order, orders as Object[])
                })
            )),
            mergeMap((orders: Order[]) => this.invoiceService.fetchInvoicesByOrders(orders.map(o => o._id)).pipe(
                map((invoices: Invoice[]) => {
                    orders = orders.map((order: Order) => {
                        order.invoice = invoices.find((invoice: Invoice) => invoice.orderReference == order.reference);
                        return order;
                    });
                    return plainToClass(Order, orders as Object[])
                })
            )),
            mergeMap((orders: Order[]) => this.invoiceService.fetchInvoicesByOrders(orders.map(o => o._id)).pipe(
                map((invoices: Invoice[]) => {
                    orders = orders.map((order: Order) => {
                        order.invoice = invoices.find((invoice: Invoice) => invoice.orderReference == order.reference);
                        return order;
                    });
                    return plainToClass(Order, orders as Object[])
                })
            )),
            catchError((response: Response) => throwError({
                message: 'Unable to fetch orders',
                response: response
            }))
        )
    }
}
