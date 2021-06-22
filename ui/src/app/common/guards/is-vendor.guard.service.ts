import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {Observable} from "rxjs/internal/Observable";
import {map, tap} from "rxjs/operators";

@Injectable()
export class IsVendorGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.fetchCurrent().pipe(
            map((user) => user.company.vendorRef != null),
            tap((isVendor) => {
                if (!isVendor) {
                    this.router.navigateByUrl('/');
                }
            }));
    }
}