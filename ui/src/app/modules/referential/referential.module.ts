import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {SellerSettingsComponent} from './components/seller-settings/seller-settings.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {AccountantVatRateSelectComponent} from './components/accountant-vat-select/accountant-vat-rate-select.component';
import {SellerSettingsService} from './services/seller-settings.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        SellerSettingsComponent,
        AccountantVatRateSelectComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        NgSelectModule,
        SharedModule
    ],
    providers: [SellerSettingsService]
})
export class ReferentialModule {
}
