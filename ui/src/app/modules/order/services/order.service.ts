import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Order} from "../../../domain/order/order";
import {catchError, flatMap, map, mergeMap} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {throwError} from "rxjs/internal/observable/throwError";
import {CustomerService} from "../../customer/services/customer.service";
import {Customer} from "../../../domain/company/customer";
import {InvoiceService} from "../../invoice/services/invoice.service";
import {Invoice} from "../../../domain/invoice/invoice";
import {PaymentService} from "../../payment/services/payment.service";
import {Payment} from "../../../domain/payment/payment";
import {forkJoin} from "rxjs/internal/observable/forkJoin";

@Injectable()
export class OrderService {

    private baseUrl = '/api/v1/orders';

    constructor(private http: HttpClient,
                private customerService: CustomerService,
                private invoiceService: InvoiceService,
                private paymentService: PaymentService) {
    }

    public fetchOrders(): Observable<Order[]> {
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
            flatMap((orders: Order[]) => {
                return forkJoin(orders.map((order: Order) => this.paymentService.fetchPaymentsByOrder(order._id).pipe(
                    map((payments: Payment[]) => {
                        order.payments = payments;
                        return order;
                    })
                )));
            }),
            catchError((response: Response) => throwError({
                message: 'Unable to fetch orders',
                response: response
            }))
        )
    }
}
