import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../common/services/authentication.service';
import {SweetAlertService} from '../../modules/shared/services/sweetAlert.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router,
                private authService: AuthenticationService,
                private alertService: SweetAlertService) {
    }

    ngOnInit() {
        const user = this.authService.getCurrentUser();
        if (user) {
            this.router.navigate(['/app/dashboard']);
        } else {
            this.authService.fetchCurrent()
                .subscribe((fetchUser) => {
                    if (fetchUser !== undefined && fetchUser !== null) {
                        this.router.navigate(['/app/dashboard']);
                    }
                });
        }
    }

    public login(value) {
        this.authService.authenticate(value)
            .subscribe((user) => {
                if (user) {
                    this.router.navigate(['/app/dashboard']);
                } else {
                    this.alertService.error({
                        text: 'login.alert.check',
                        title: 'login.alert.fail',
                        customClass: 'swal2-for-login',
                        timer: 3000
                    });
                }
            });
    }

}
