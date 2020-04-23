import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {SellerSettingsComponent} from './components/seller-settings/seller-settings.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {AccountantVatRateSelectComponent} from './components/accountant-vat-select/accountant-vat-rate-select.component';
import {ServiceKindSelectComponent} from '../shared/components/selects/service-kind-select/service-kind-select.component';
import {SellerSettingsService} from './services/seller-settings.service';

@NgModule({
    declarations: [
        SellerSettingsComponent,
        AccountantVatRateSelectComponent,
        ServiceKindSelectComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        NgSelectModule
    ],
    providers: [SellerSettingsService]
})
export class ReferentialModule {
}
