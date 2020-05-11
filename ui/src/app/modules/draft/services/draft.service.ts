import {Observable} from 'rxjs/internal/Observable';
import {Invoice} from '../../../domain/invoice/invoice';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {throwError} from 'rxjs/internal/observable/throwError';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DraftService {

    private baseUrl = '/api/drafts';

    constructor(private http: HttpClient) {
    }

    public fetchDrafts(): Observable<Array<Invoice>> {
        return this.http
            .get<Invoice>(this.baseUrl).pipe(
                map((result: any) => plainToClass(Invoice, result as Object[])),
                catchError((response: Response) => throwError({
                    message: 'Unable to fetch to prepare invoices',
                    response: response
                })));
    }
}
