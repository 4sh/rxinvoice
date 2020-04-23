import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {Observable} from 'rxjs/internal/Observable';
import {filter, map, tap} from 'rxjs/operators';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.fetchCurrent().pipe(
            filter(user => user !== undefined),
            map(user => user !== null),
            tap(isConnectedUser => {
                if (!isConnectedUser) {
                    this.router.navigateByUrl('/login');
                }
            }));
    }
}
