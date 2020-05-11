import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgModule} from '@angular/core';
import {DebounceDirective} from './common/directives/debounce.directive';
import {AppComponent} from './app/app.component';
import {SidebarComponent} from './common/components/sidebar/sidebar.component';
import {AppHeaderComponent} from './common/components/app-header/app-header.component';
import {CustomerDetailComponent} from './pages/customer-detail/customer-detail.component';
import {CustomersComponent} from './pages/customers/customers.component';
import {LoginComponent} from './pages/login/login.component';
import {AppContentComponent} from './app-content/app-content.component';
import {CustomersListComponent} from './common/components/customers-list/customers-list.component';
import {AddressInputComponent} from './common/components/address-input/address-input.component';
import {BusinessDetailComponent} from './common/components/business-detail/business-detail.component';
import {VatDetailComponent} from './common/components/vat-detail/vat-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {RepositoryService} from './common/services/repository.service';
import {CompanyService} from './common/services/company.service';
import {LoggedInGuard} from './common/guards/logged-in.guard';
import {AuthenticationService} from './common/services/authentication.service';
import {HttpInterceptorService} from './common/services/http-interceptor.service';
import {ActivityPanelComponent} from './common/components/activity-panel/activity-panel.component';
import {ActivityService} from './common/services/activity.service';
import {StyleGuideModule} from './style-guide-module/style-guide.module';
import {UserService} from './common/services/user.service';
import {AnalyzeComponent} from './pages/analyze/analyze.component';
import {ReferentialModule} from './modules/referential/referential.module';
import {SharedModule} from './modules/shared/shared.module';
import {ModalService} from './common/components/modal/modal-service.service';
import {ModalContainerComponent} from './common/components/modal/components/modal-container/modal-container.component';
import {InvoiceEditionPopupComponent} from './common/components/invoice-edition-popup/invoice-edition-popup.component';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {ButtonsModule} from './modules/shared/components/atoms/buttons/buttons.module';
import {InvoiceModule} from './modules/invoice/invoice.module';
import {DraftModule} from './modules/draft/draft.module';
import {DpDatePickerModule} from 'ng2-date-picker';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '/api/i18n/', 'labels.json');
}

@NgModule({
    declarations: [
        // Pipes

        // Directives
        DebounceDirective,
        // Components
        AppComponent,
        SidebarComponent,
        AppHeaderComponent,
        CustomerDetailComponent,
        CustomersComponent,
        LoginComponent,
        AppContentComponent,
        CustomersListComponent,
        AddressInputComponent,
        BusinessDetailComponent,
        VatDetailComponent,
        CustomerDetailComponent,
        ActivityPanelComponent,
        AnalyzeComponent,
        ModalContainerComponent,
        InvoiceEditionPopupComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        StyleGuideModule,
        DashboardModule,
        ReferentialModule,
        InvoiceModule,
        DraftModule,
        SharedModule,
        DpDatePickerModule,
        NgSelectModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        ButtonsModule
    ],
    providers: [
        TranslateService,
        RepositoryService,
        CompanyService,
        LoggedInGuard,
        AuthenticationService,
        ActivityService,
        UserService,
        DatePipe,
        CurrencyPipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },
        ModalService
    ],
    entryComponents: [ModalContainerComponent, InvoiceEditionPopupComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
