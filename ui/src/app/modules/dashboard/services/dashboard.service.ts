import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {plainToClass} from 'class-transformer';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {DashboardConfiguration} from '../../../domain/company/dashboard/dashboard-configuration';

@Injectable()
export class DashboardService {

    private baseUrl = '/api/companies';

    constructor(private httpClient: HttpClient) {
    }

    public fetchDashboardConfigurations(companyId: string): Observable<Array<DashboardConfiguration>> {
        return this.httpClient
            .get<Array<DashboardConfiguration>>(`${this.baseUrl}/${companyId}/dashboards`).pipe(
                map((result: any) => plainToClass(DashboardConfiguration, result as Object[])),
                catchError((response: Response) => throwError({message: 'Unable to fetch dashboards', response: response})));
    }
}
