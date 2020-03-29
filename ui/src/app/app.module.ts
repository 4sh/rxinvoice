import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {CustomerSelectComponent} from './common/components/selects/customer-select/customer-select.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgModule} from '@angular/core';
import {DebounceDirective} from './common/directives/debounce.directive';
import {DashboardAdminComponent} from './pages/dashboard-admin/dashboard-admin.component';
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
import {InDatePickerComponent} from './common/components/date-picker/date-picker.component';
import { InvoiceLinesDetailComponent } from './common/components/invoice-lines-detail/invoice-lines-detail.component';
import { SpinnerComponent } from './common/components/spinner/spinner.component';
import { AttachmentsDetailComponent } from './common/components/attachments-detail/attachments-detail.component';
import { ActivityPanelComponent } from './common/components/activity-panel/activity-panel.component';
import {TabComponent} from './common/components/tabs/tab.component';
import {TabsComponent} from './common/components/tabs/tabs.component';
import {ActivityService} from './common/services/activity.service';
import {SweetAlertService} from './common/services/sweetAlert.service';
import {FileUploadModule} from 'ng2-file-upload';
import {ToggleComponent} from './common/components/toggle-boolean/toggle.component';
import {OrderByPipe} from './common/pipes/orderBy.pipe';
import {DownloadInvoiceService} from './common/services/download-invoice.service';
import {QuickStatusEditPanelComponent
} from './common/components/quick-status-edit-panel/quick-status-edit-panel.component';
import {StyleGuideModule} from './style-guide-module/style-guide.module';
import {DpDatePickerModule} from "ng2-date-picker";
import { VatSelectComponent } from './common/components/selects/vat-select/vat-select.component';
import { InvoiceLineFormComponent } from './common/components/invoice-lines-detail/invoice-line-form/invoice-line-form.component';
import { InvoiceLineHeaderComponent } from './common/components/invoice-lines-detail/invoice-line-header/invoice-line-header.component';
import {SpacerComponent} from './common/components/spacer/spacer.component';
import { DashboardColumnComponent } from './common/components/dashboard/dashboard-column/dashboard-column.component';
import { DashboardTicketComponent } from './common/components/dashboard/dashboard-ticket/dashboard-ticket.component';
import { DashboardPilotComponent } from './pages/dashboard-pilot/dashboard-pilot.component';
import {DndModule} from 'ngx-drag-drop';
import { DraftsComponent } from './pages/drafts/drafts.component';


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
        InDatePickerComponent,
        InvoiceLinesDetailComponent,
        SpinnerComponent,
        AttachmentsDetailComponent,
        ActivityPanelComponent,
        TabComponent,
        TabsComponent,
        ToggleComponent,
        QuickStatusEditPanelComponent,
        VatSelectComponent,
        InvoiceLineFormComponent,
        InvoiceLineHeaderComponent,
        SpacerComponent,
        DashboardAdminComponent,
        DashboardPilotComponent,
        DashboardColumnComponent,
        DashboardTicketComponent,
        DraftsComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        NgSelectModule,
        DpDatePickerModule,
        StyleGuideModule,
        FileUploadModule,
        DndModule,
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
        ActivityService,
        SweetAlertService,
        DownloadInvoiceService,
        DatePipe,
        CurrencyPipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
