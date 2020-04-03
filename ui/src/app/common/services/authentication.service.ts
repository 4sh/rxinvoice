import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Md5} from 'ts-md5/dist/md5';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import {User} from '../../models/user.model';
import {CompanyModel} from '../../models/company.model';
import {CompanyService} from './company.service';
import {map, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

    private baseUrl = '/api/sessions';

    public userEvents: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
    public companyEvents: BehaviorSubject<CompanyModel> = new BehaviorSubject<CompanyModel>(undefined);

    constructor(private router: Router,
                private companyService: CompanyService,
                private http: HttpClient) {
    }

    public authenticate(login: { name: string, password: string }): Observable<User> {
        const md5 = new Md5().appendStr(login.password).end();

        const authPayload = {principal: {name: login.name, passwordHash: md5}};

        this.http.post(this.baseUrl, authPayload, {withCredentials: true}).pipe(
            map((result: any) => result.principal),
            tap((user: User) => this.userEvents.next(user)),
            switchMap(user => this.companyService.fetchCompany(user.companyRef)))
            .subscribe(company =>
                    this.companyEvents.next(company),
                () => {
                        this.userEvents.next(undefined),
                        this.companyEvents.next(undefined)
                });
        return this.userEvents;
    }

    public fetchCurrent(): Observable<User> {
        this.http.get(this.baseUrl + '/current', {withCredentials: true}).pipe(
            map((result: any) => result.principal))
            .subscribe((user: User) => {
                this.userEvents.next(user);
                this.companyService.fetchCompany(user.companyRef)
                    .subscribe(company => this.companyEvents.next(company))
            });
            // tap((user: User) => this.userEvents.next(user)),
            // switchMap(user => this.companyService.fetchCompany(user.companyRef)))
            // .subscribe(company =>
            //         c
            //     () => {
            //         this.userEvents.next(undefined),
            //             this.companyEvents.next(undefined)
            //     });
        return this.userEvents;
    }

    public getCurrentUser(): User {
        return this.userEvents.getValue();
    }

    public getCurrentCompany(): CompanyModel {
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
