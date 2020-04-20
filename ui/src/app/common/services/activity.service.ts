import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
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
            .get(`${this.baseUrl}/latest`)
            .map((result: any) => plainToClass(Activity, result as Object[]))
            .catch((response: Response) => Observable.throw({ message: 'Unable to fetch activities', response: response }));
    }

}
