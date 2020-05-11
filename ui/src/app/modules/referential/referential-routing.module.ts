import {ReferentialModule} from './referential.module';
import {RouterModule} from '@angular/router';
import {SellerSettingsComponent} from './components/seller-settings/seller-settings.component';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [
        ReferentialModule,
        RouterModule.forChild([
                {
                    path: '', component: SellerSettingsComponent, data: {title: 'fdssdf'}
                }
            ]
        )
    ]
})
export class ReferentialRoutingModule {
}
