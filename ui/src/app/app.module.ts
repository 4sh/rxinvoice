import {NgModule} from '@angular/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {OrderByPipe} from './common/pipes/orderBy.pipe';
import {DebounceDirective} from './common/directives/debounce.directive';
import {AppComponent} from './app/app.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {InvoicesListComponent} from './common/components/invoices-list/invoices-list.component';
import {SidebarComponent} from './common/components/sidebar/sidebar.component';
import {AppHeaderComponent} from './common/components/app-header/app-header.component';
import {CustomerNewComponent} from './pages/customer-new/customer-new.component';
import {InvoiceNewComponent} from './pages/invoice-new/invoice-new.component';
import {CustomersComponent} from './pages/customers/customers.component';
import {LoginComponent} from './pages/login/login.component';
import {AppContentComponent} from './app-content/app-content.component';
import {InvoicesComponent} from './pages/invoices/invoices.component';
import {CustomersListComponent} from './common/components/customers-list/customers-list.component';
import {AddressComponent} from './common/components/address/address.component';
import {BusinessComponent} from './common/components/business/business.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {InvoiceService} from './common/services/invoice.service';
import {RepositoryService} from './common/services/repository.service';
import {CompanyService} from './common/services/company.service';
import {LoggedInGuard} from './common/guards/logged-in.guard';
import {AuthenticationService} from './common/services/authentication.service';
import {HttpInterceptorService} from './common/services/http-interceptor.service';


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '/api/i18n/', 'labels.json');
}

@NgModule({
    declarations: [
        // Pipes
        OrderByPipe,
        // Directves
        DebounceDirective,
        // Components
        DashboardComponent,
        AppComponent,
        InvoicesListComponent,
        SidebarComponent,
        AppHeaderComponent,
        CustomerNewComponent,
        InvoiceNewComponent,
        CustomersComponent,
        LoginComponent,
        AppContentComponent,
        InvoicesComponent,
        CustomersListComponent,
        AddressComponent,
        BusinessComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
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
        TranslateService,
        RepositoryService,
        CompanyService,
        LoggedInGuard,
        AuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
