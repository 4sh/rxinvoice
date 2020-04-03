import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/user.model';

@Injectable()
export class UserService {

  private baseUrl = '/api/users';

  constructor(private http: HttpClient) { }

  public fetchUsers() {
  return this.http.get(this.baseUrl)
        .map((result: any) => plainToClass(User, result as Object[]))
        .catch((response: Response) => Observable.throw({ message: 'Unable to fetch users', response: response }));
  }
}
