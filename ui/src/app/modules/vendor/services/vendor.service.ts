import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {throwError} from 'rxjs/internal/observable/throwError';
import {HttpClient} from '@angular/common/http';
import {Vendor} from "../../../domain/company/vendor";

@Injectable()
export class VendorService {

    private baseUrl = '/api/v1/vendors';

    constructor(private http: HttpClient) {
    }

    public fetchVendor(id): Observable<Vendor> {
        return this.http
            .get(this.baseUrl + '/' + id).pipe(
                map((result: any) => plainToClass(Vendor, result as Object)),
                catchError((response: Response) => throwError({
                    message: 'Unable to fetch vendor',
                    response: response
                })));
    }

    public fetchVendors(query?): Observable<Vendor[]> {
        const params = query ? {params: {query: query}} : undefined;
        return this.http
            .get(this.baseUrl, params).pipe(
                map((result: any) => plainToClass(Vendor, result as Object[])),
                catchError((response: Response) => throwError({
                    message: 'Unable to fetch vendors',
                    response: response
                })));
    }

    public createVendor(vendor): Observable<Vendor> {
        return this.http
            .post(this.baseUrl, vendor).pipe(
                map((result: any) => plainToClass(Vendor, result as Object)),
                catchError((response: Response) => throwError({
                    message: 'Unable to create vendor',
                    response: response
                })));
    }

    public updateVendor(vendor): Observable<Vendor> {
        return this.http
            .put(this.baseUrl + '/' + vendor._id, vendor).pipe(
                map((result: any) => plainToClass(Vendor, result as Object)),
                catchError((response: Response) => throwError({
                    message: 'Unable to update vendor',
                    response: response
                })));
    }

    public deleteVendor(vendor): Observable<Vendor> {
        return this.http
            .delete(this.baseUrl + '/' + vendor._id, vendor).pipe(
                map((result: any) => plainToClass(Vendor, result as Object)),
                catchError((response: Response) => throwError({
                    message: 'Unable to delete vendor',
                    response: response
                })));
    }
}
