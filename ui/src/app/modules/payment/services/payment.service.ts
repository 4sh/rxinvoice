import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {catchError, map, mergeMap} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {throwError} from "rxjs/internal/observable/throwError";
import {Payment} from "../../../domain/payment/payment";
import {OrderPayment} from "../../../domain/payment/order-payment";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    private baseUrl = '/api/v1/payments';
    private orderBaseUrl = '/api/v1/orders';

    constructor(private http: HttpClient) {
    }

    public fetchPaymentsByOrder(orderId: string): Observable<Payment[]> {
        return this.fetchOrderPaymentsByOrder(orderId).pipe(
            mergeMap((orderPayments: OrderPayment[]) => this.http.get(this.baseUrl + '?paymentIds[]=' + orderPayments.map(p => p.paymentRef).join(',')).pipe(
                map((payments: any) => {
                    payments = payments.map((payment: any) => {
                        payment.orders = orderPayments.filter((orderPayment: OrderPayment) => orderPayment.paymentRef == payment._id);
                        return payment;
                    });
                    return plainToClass(Payment, payments as Object[])
                })
            )),
            catchError((response: Response) => throwError({
                message: 'Unable to fetch payments',
                response: response
            }))
        );
    }

    public fetchOrderPaymentsByOrder(orderId: string): Observable<OrderPayment[]> {
        return this.http.get(`${this.orderBaseUrl}/${orderId}/order-payments`).pipe(
            map((result: any) => plainToClass(OrderPayment, result as Object[])),
            catchError((response: Response) => throwError({
                message: 'Unable to fetch order payments',
                response: response
            }))
        );
    }
}
