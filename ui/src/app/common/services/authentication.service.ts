import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ConnectedUser, User} from '../../domain/user/user';
import {Company} from '../../domain/company/company';
import {CompanyService} from './company.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class AuthenticationService {

    private baseUrl = '/api/sessions';

    public userEvents: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
    public companyEvents: BehaviorSubject<Company> = new BehaviorSubject<Company>(undefined);

    constructor(private router: Router,
                private companyService: CompanyService,
                private http: HttpClient) {
    }

    public authenticate(login: { name: string, password: string }): Observable<User> {
        const md5 = new Md5().appendStr(login.password).end();

        const authPayload = {principal: {name: login.name, passwordHash: md5}};

        return this.http.post(this.baseUrl, authPayload, {withCredentials: true})
            .pipe(
                map((result: any) => result.principal),
                tap((user: User) => this.userEvents.next(user)),
                mergeMap(user => this.companyService.fetchCompany(user.companyRef)
                    .pipe(
                        tap((company: Company) => this.companyEvents.next(company)),
                        map(company => user)
                    )));
    }

    public fetchCurrent(): Observable<ConnectedUser> {
        return this.http.get(this.baseUrl + '/current', {withCredentials: true})
            .pipe(
                map((result: any) => result.principal),
                tap((user: User) => this.userEvents.next(user)),
                mergeMap(user => this.companyService.fetchCompany(user.companyRef)
                    .pipe(
                        tap((company: Company) => this.companyEvents.next(company)),
                        map(company => new ConnectedUser(user, company))
                    )));
    }

    public getCurrentUser(): User {
        return this.userEvents.getValue();
    }

    public getCurrentCompany(): Company {
        return this.companyEvents.getValue();
    }

    public logout(): void {
        this.http.delete(this.baseUrl + '/current').subscribe(() => {
            this.userEvents.next(undefined);
            this.companyEvents.next(undefined);
            this.router.navigate(['/login']);
        });
    }
}
