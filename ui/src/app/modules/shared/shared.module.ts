import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {ToggleComponent} from './components/toggle-boolean/toggle.component';
import {InDatePickerComponent} from './components/date-picker/date-picker.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {TabComponent} from './components/tabs/tab.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {SpacerComponent} from './components/spacer/spacer.component';
import {CommonModule} from '@angular/common';
import {DpDatePickerModule} from 'ng2-date-picker';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {SweetAlertService} from './services/sweetAlert.service';
import {InvoiceCurrencyPipe} from './pipes/invoice-currency.pipe';

const components = [
    ToggleComponent,
    InDatePickerComponent,
    SpinnerComponent,
    TabComponent,
    TabsComponent,
    SpacerComponent,
    InvoiceCurrencyPipe
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        DpDatePickerModule,
        NgSelectModule
    ],
    declarations: components,
    exports: components,

    providers: [
        TranslateService,
        SweetAlertService
    ]
})
export class SharedModule {
}
