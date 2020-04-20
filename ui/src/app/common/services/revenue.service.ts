import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {plainToClass} from 'class-transformer';
import {HttpClient} from '@angular/common/http';
import {Revenue} from '../../domain/commercial-relationship/revenue';

@Injectable()
export class RevenueService {

    private baseUrl = '/api/revenues';

    constructor(private http: HttpClient) { }

    public getFiscalYearRevenues(): Observable<Revenue[]> {
        return this.http
            .get(this.baseUrl + ' /fiscal')
            .map((result: any) => plainToClass(Revenue, result as Object[]))
            .catch((response: Response) => Observable.throw({ message: 'Unable to fetch revenues', response: response }));
    }

}
