import {throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {plainToClass} from 'class-transformer';
import {User} from '../../domain/user/user';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class UserService {

    private baseUrl = '/api/users';

    constructor(private http: HttpClient) {
    }

    public fetchUsers() {
        return this.http.get(this.baseUrl).pipe(
            map((result: any) => plainToClass(User, result as Object[])),
            catchError((response: Response) => observableThrowError({
                message: 'Unable to fetch users',
                response: response
            }))
        );
    }
}
