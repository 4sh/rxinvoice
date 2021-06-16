import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Company} from '../../domain/company/company';
import {HttpClient} from '@angular/common/http';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs/internal/Observable';
import {throwError} from 'rxjs/internal/observable/throwError';


@Injectable()
export class CompanyService {

    private baseUrl = '/api/v1/customers';

    constructor(private http: HttpClient) {
    }

    public fetchCompany(id): Observable<Company> {
        return this.http
            .get(this.baseUrl + id).pipe(
                map((result: any) => plainToClass(Company, result as Object)),
                catchError((response: Response) => throwError({message: 'Unable to fetch company', response: response})));
    }

}
