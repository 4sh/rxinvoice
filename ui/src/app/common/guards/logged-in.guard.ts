import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";
import {Injectable} from "@angular/core";

// @Injectable()
// export class LoggedInGuard implements CanActivate {
//
//     constructor(private router: Router,
//                 private authService: AuthenticationService) {
//     }
//
//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//         return this.authService.fetchCurrent().pipe(
//             filter(user => user !== undefined),
//             map(user => user !== null),
//             tap(isConnectedUser => {
//                 if (!isConnectedUser) {
//                     this.router.navigateByUrl('/login');
//                 }
//             }));
//     }
// }

@Injectable()
export class LoggedInGuard extends KeycloakAuthGuard {

    constructor(protected readonly router: Router,
                protected readonly keycloak: KeycloakService) {
        super(router, keycloak);
    }

    public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authenticated) {
            await this.keycloak.login({
                redirectUri: window.location.origin + state.url,
            });
        }

        return this.authenticated;
    }
}