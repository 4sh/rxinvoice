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
import {AStatusComponent} from './components/atoms/a-status/a-status.component';
import {AMonthSelectComponent} from './components/atoms/selects/a-month-select/a-month-select.component';
import {AServiceKindSelectComponent} from './components/atoms/selects/a-service-kind-select/a-service-kind-select.component';
import {AUserSelectComponent} from './components/atoms/selects/a-user-select/a-user-select.component';
import {AVatSelectComponent} from './components/atoms/selects/a-vat-select/a-vat-select.component';
import {AYearSelectComponent} from './components/atoms/selects/a-year-select/a-year-select.component';
import {ACustomerSelectComponent} from './components/atoms/selects/a-customer-select/a-customer-select.component';
import {ASpinnerComponent} from './components/atoms/a-spinner/a-spinner.component';
import {ButtonsModule} from './components/atoms/buttons/buttons.module';

const components = [
    AToggleComponent,
    InDatePickerComponent,
    ASpinnerComponent,
    ATabComponent,
    ATabsComponent,
    ASpacerComponent,
    InvoiceCurrencyPipe,
    AStatusComponent,
    AMonthSelectComponent,
    AServiceKindSelectComponent,
    AUserSelectComponent,
    AVatSelectComponent,
    AYearSelectComponent,
    ACustomerSelectComponent
];

const pipes = [OrderByPipe];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        DpDatePickerModule,
        NgSelectModule,
        ButtonsModule
    ],
    declarations: [components, pipes],
    exports: [components, pipes],

    providers: [
        TranslateService,
        SweetAlertService
    ]
})
export class SharedModule {
}
