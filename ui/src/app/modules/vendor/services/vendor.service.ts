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
}
