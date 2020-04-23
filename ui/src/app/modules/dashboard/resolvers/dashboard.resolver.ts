import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {DashboardService} from '../services/dashboard.service';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../../../common/services/authentication.service';
import {of} from 'rxjs/internal/observable/of';
import {DashboardConfiguration} from '../../../domain/company/dashboard/dashboard-configuration';

@Injectable()
export class DashboardResolver implements Resolve<Array<DashboardConfiguration>> {

    constructor(private authenticationService: AuthenticationService,
                private dashboardService: DashboardService,
                private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Array<DashboardConfiguration>> {
        return this.authenticationService.fetchCurrent()
            .pipe(
                switchMap(connectedUser => this.dashboardService.fetchDashboardConfigurations(connectedUser.companyRef)),
                catchError(errorResponse => { this.router.navigate(['/app/invoices']); return of(null); }));
    }
}
