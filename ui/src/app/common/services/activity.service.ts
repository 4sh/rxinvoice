import {throwError as observableThrowError, Observable} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {plainToClass} from 'class-transformer';
import {HttpClient} from '@angular/common/http';
import {Activity} from '../../domain/common/activity';

@Injectable()
export class ActivityService {

    private baseUrl = '/api/activities';

    constructor(private http: HttpClient) {
    }

    public fetchActivities(): Observable<Activity[]> {
        return this.http
            .get(`${this.baseUrl}/latest`).pipe(
                map((result: any) => plainToClass(Activity, result as Object[])),
                catchError((response: Response) => observableThrowError({
                    message: 'Unable to fetch activities',
                    response: response
                })));
    }

}
