import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {CustomerSelectComponent} from './modules/shared/components/selects/customer-select/customer-select.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgModule} from '@angular/core';
import {DebounceDirective} from './common/directives/debounce.directive';
import {AppComponent} from './app/app.component';
import {InvoicesListComponent} from './common/components/invoices-list/invoices-list.component';
import {SidebarComponent} from './common/components/sidebar/sidebar.component';
import {AppHeaderComponent} from './common/components/app-header/app-header.component';
import {CustomerDetailComponent} from './pages/customer-detail/customer-detail.component';
import {CustomersComponent} from './pages/customers/customers.component';
import {LoginComponent} from './pages/login/login.component';
import {AppContentComponent} from './app-content/app-content.component';
import {InvoicesComponent} from './pages/invoices/invoices.component';
import {CustomersListComponent} from './common/components/customers-list/customers-list.component';
import {AddressInputComponent} from './common/components/address-input/address-input.component';
import {BusinessDetailComponent} from './common/components/business-detail/business-detail.component';
import {VatDetailComponent} from './common/components/vat-detail/vat-detail.component';
import {InvoiceDetailComponent} from './pages/invoice-detail/invoice-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {InvoiceService} from './common/services/invoice.service';
import {RepositoryService} from './common/services/repository.service';
import {CompanyService} from './common/services/company.service';
import {LoggedInGuard} from './common/guards/logged-in.guard';
import {AuthenticationService} from './common/services/authentication.service';
import {HttpInterceptorService} from './common/services/http-interceptor.service';
import {InvoiceLinesDetailComponent} from './common/components/invoice-lines-detail/invoice-lines-detail.component';
import {AttachmentsDetailComponent} from './common/components/attachments-detail/attachments-detail.component';
import {ActivityPanelComponent} from './common/components/activity-panel/activity-panel.component';
import {ActivityService} from './common/services/activity.service';
import {FileUploadModule} from 'ng2-file-upload';
import {OrderByPipe} from './common/pipes/orderBy.pipe';
import {DownloadInvoiceService} from './common/services/download-invoice.service';
import {StyleGuideModule} from './style-guide-module/style-guide.module';
import {VatSelectComponent} from './modules/shared/components/selects/vat-select/vat-select.component';
import {InvoiceLineFormComponent} from './common/components/invoice-lines-detail/invoice-line-form/invoice-line-form.component';
import {InvoiceLineHeaderComponent} from './common/components/invoice-lines-detail/invoice-line-header/invoice-line-header.component';
import {UserSelectComponent} from './modules/shared/components/selects/user-select/user-select.component';
import {UserService} from './common/services/user.service';
import {AnalyzeComponent} from './pages/analyze/analyze.component';
import {YearSelectComponent} from './modules/shared/components/selects/year-select/year-select.component';
import {MonthSelectComponent} from './modules/shared/components/selects/month-select/month-select.component';
import {ReferentialModule} from './modules/referential/referential.module';
import {SharedModule} from './modules/shared/shared.module';
import {DraftsComponent} from './pages/drafts/drafts.component';
import {ModalService} from './common/components/modal/modal-service.service';
import {ModalContainerComponent} from './common/components/modal/components/modal-container/modal-container.component';
import {InvoiceEditionPopupComponent} from './common/components/invoice-edition-popup/invoice-edition-popup.component';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {DraftService} from './common/services/draft.service';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '/api/i18n/', 'labels.json');
}

@NgModule({
    declarations: [
        // Pipes
        OrderByPipe,
        // Directives
        DebounceDirective,
        // Components
        AppComponent,
        InvoicesListComponent,
        SidebarComponent,
        AppHeaderComponent,
        CustomerDetailComponent,
        CustomersComponent,
        LoginComponent,
        AppContentComponent,
        InvoicesComponent,
        CustomersListComponent,
        AddressInputComponent,
        BusinessDetailComponent,
        VatDetailComponent,
        CustomerDetailComponent,
        InvoiceDetailComponent,
        CustomerSelectComponent,
        InvoiceLinesDetailComponent,
        AttachmentsDetailComponent,
        ActivityPanelComponent,
        VatSelectComponent,
        InvoiceLineFormComponent,
        InvoiceLineHeaderComponent,
        UserSelectComponent,
        AnalyzeComponent,
        YearSelectComponent,
        MonthSelectComponent,
        DraftsComponent,
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
        FileUploadModule,
        DashboardModule,
        ReferentialModule,
        SharedModule,
        NgSelectModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        InvoiceService,
        DraftService,
        TranslateService,
        RepositoryService,
        CompanyService,
        LoggedInGuard,
        AuthenticationService,
        ActivityService,
        DownloadInvoiceService,
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
