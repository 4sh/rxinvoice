import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Order} from "../../../domain/order/order";
import {catchError, map, mergeMap} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {throwError} from "rxjs/internal/observable/throwError";
import {CustomerService} from "../../customer/services/customer.service";
import {Customer} from "../../../domain/company/customer";

@Injectable()
export class OrderService {

    private baseUrl = '/api/v1/orders';

    constructor(private http: HttpClient,
                private customerService: CustomerService) {
    }

    fetchOrders(): Observable<Order[]> {
        return this.http.get(this.baseUrl).pipe(
            mergeMap((result: any) => this.customerService.fetchCustomers().pipe(
                map((customers: Customer[]) => {
                    result = result.map((order) => {
                        order.customer = customers.find((customer: Customer) => customer._id == order.customerRef)
                        return order
                    })
                    return plainToClass(Order, result as Object[])
                })
            )),
            catchError((response: Response) => throwError({
                message: 'Unable to fetch orders',
                response: response
            }))
        )
    }
}
