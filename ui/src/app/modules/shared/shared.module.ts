import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {AToggleComponent} from './components/atoms/a-toggle-boolean/a-toggle.component';
import {InDatePickerComponent} from './components/atoms/a-date-picker/a-date-picker.component';
import {ATabComponent} from './components/atoms/a-tabs/a-tab.component';
import {ATabsComponent} from './components/atoms/a-tabs/a-tabs.component';
import {ASpacerComponent} from './components/atoms/a-spacer/a-spacer.component';
import {CommonModule} from '@angular/common';
import {DpDatePickerModule} from 'ng2-date-picker';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {SweetAlertService} from './services/sweetAlert.service';
import {InvoiceCurrencyPipe} from './pipes/invoice-currency.pipe';
import {OrderByPipe} from './pipes/order-by.pipe';
import {AMonthSelectComponent} from './components/atoms/selects/a-month-select/a-month-select.component';
import {AServiceKindSelectComponent} from './components/atoms/selects/a-service-kind-select/a-service-kind-select.component';
import {AUserSelectComponent} from './components/atoms/selects/a-user-select/a-user-select.component';
import {AVatSelectComponent} from './components/atoms/selects/a-vat-select/a-vat-select.component';
import {AYearSelectComponent} from './components/atoms/selects/a-year-select/a-year-select.component';
import {ACustomerSelectComponent} from './components/atoms/selects/a-customer-select/a-customer-select.component';
import {ASpinnerComponent} from './components/atoms/a-spinner/a-spinner.component';
import {ButtonsModule} from './components/atoms/buttons/buttons.module';
import {ADashboardSelectComponent} from './components/atoms/selects/a-dashboard-select/a-dashboard-select.component';
import {ABusinessSelectComponent} from './components/atoms/selects/a-business-select/a-business-select.component';
import {AInvoiceStatusSelectComponent} from './components/atoms/selects/a-invoice-status-select/a-invoice-status-select.component';
import {NavigationMenuComponent} from './components/navigation-menu/navigation-menu.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { AInvoiceStatusComponent } from './components/atoms/invoice/a-invoice-status/a-invoice-status.component';
import { AInvoiceDateComponent } from './components/atoms/invoice/a-invoice-date/a-invoice-date.component';

const components = [
    AToggleComponent,
    InDatePickerComponent,
    ASpinnerComponent,
    ATabComponent,
    ATabsComponent,
    ASpacerComponent,
    InvoiceCurrencyPipe,
    AMonthSelectComponent,
    AServiceKindSelectComponent,
    AUserSelectComponent,
    AVatSelectComponent,
    AYearSelectComponent,
    ACustomerSelectComponent,
    ADashboardSelectComponent,
    ABusinessSelectComponent,
    AInvoiceStatusSelectComponent,
    NavigationMenuComponent
];

const pipes = [OrderByPipe];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TranslateModule,
        DpDatePickerModule,
        NgSelectModule,
        ButtonsModule
    ],
    declarations: [components, pipes, AInvoiceStatusComponent, AInvoiceDateComponent],
    exports: [components, pipes, AInvoiceStatusComponent, AInvoiceDateComponent],

    providers: [
        TranslateService,
        SweetAlertService
    ]
})
export class SharedModule {
}
