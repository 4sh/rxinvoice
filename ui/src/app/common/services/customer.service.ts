import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Company} from '../../domain/company/company';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {throwError} from 'rxjs/internal/observable/throwError';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CustomerService {

    private baseUrl = '/api/customers';

    constructor(private http: HttpClient) {
    }

    public fetchCustomer(id): Observable<Company> {
        return this.http
            .get(this.baseUrl + '/' + id).pipe(
                map((result: any) => plainToClass(Company, result as Object)),
                catchError((response: Response) => throwError({message: 'Unable to fetch company', response: response})));
    }
}
