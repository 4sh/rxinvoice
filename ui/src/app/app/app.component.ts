import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../common/services/authentication.service';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private translate: TranslateService,
                private authService: AuthenticationService,
                private router: Router) {}

    ngOnInit(): void {
        this.authService.fetchCurrent().subscribe(); // TODO Check this
        registerLocaleData(localeFr);
        this.translate.setDefaultLang('');
        this.translate.use('');
    }

    onLogin() {
        return this.router.url.indexOf('/login') > -1;
    }
}
