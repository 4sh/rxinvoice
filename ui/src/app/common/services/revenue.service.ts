import {throwError as observableThrowError, Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {plainToClass} from 'class-transformer';
import {HttpClient} from '@angular/common/http';
import {Revenue} from '../../domain/commercial-relationship/revenue';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class RevenueService {

    private baseUrl = '/api/revenues';

    constructor(private http: HttpClient) { }

    public getFiscalYearRevenues(): Observable<Revenue[]> {
        return this.http
            .get<Revenue[]>(this.baseUrl + ' /fiscal').pipe(
                map((result: any) => plainToClass(Revenue, result as Object[])),
                catchError((response: Response) => observableThrowError({
                    message: 'Unable to fetch revenues',
                    response: response
                })));
    }

}
