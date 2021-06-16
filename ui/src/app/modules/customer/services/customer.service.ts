import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {throwError} from 'rxjs/internal/observable/throwError';
import {HttpClient} from '@angular/common/http';
import {Customer} from "../../../domain/company/customer";

@Injectable()
export class CustomerService {

    private baseUrl = '/api/v1/customers';

    constructor(private http: HttpClient) {
    }

    public fetchCustomer(id): Observable<Customer> {
        return this.http
            .get(this.baseUrl + '/' + id).pipe(
                map((result: any) => plainToClass(Customer, result as Object)),
                catchError((response: Response) => throwError({
                    message: 'Unable to fetch customer',
                    response: response
                })));
    }

    public fetchCustomers(query?): Observable<Customer[]> {
        const params = (query ? {params: {query: query}} : undefined);
        return this.http
            .get(this.baseUrl, params).pipe(
                map((result: any) => plainToClass(Customer, result as Object[])),
                catchError((response: Response) => throwError({
                    message: 'Unable to fetch customers',
                    response: response
                })));
    }

    public createCustomer(customer): Observable<Customer> {
        return this.http
            .post(this.baseUrl, customer).pipe(
                map((result: any) => plainToClass(Customer, result as Object)),
                catchError((response: Response) => throwError({
                    message: 'Unable to create customer',
                    response: response
                })));
    }

    public updateCustomer(customer): Observable<Customer> {
        return this.http
            .put(this.baseUrl + '/' + customer._id, customer).pipe(
                map((result: any) => plainToClass(Customer, result as Object)),
                catchError((response: Response) => throwError({
                    message: 'Unable to update customer',
                    response: response
                })));
    }

    public deleteCustomer(customer): Observable<Customer> {
        return this.http
            .delete(this.baseUrl + '/' + customer._id, customer).pipe(
                map((result: any) => plainToClass(Customer, result as Object)),
                catchError((response: Response) => throwError({
                    message: 'Unable to delete customer',
                    response: response
                })));
    }
}
