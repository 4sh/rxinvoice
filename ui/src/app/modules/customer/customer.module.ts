import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedModule} from '../shared/shared.module';
import {ButtonsModule} from '../shared/components/atoms/buttons/buttons.module';
import {CustomersComponent} from './components/customers/customers.component';
import {CustomerDetailComponent} from './components/customer-detail/customer-detail.component';
import {CustomersListComponent} from './components/customers-list/customers-list.component';
import {CustomerService} from './services/customer.service';
import {CustomerResolver} from './resolvers/customer.resolver';
import {DebounceDirective} from './directives/debounce.directive';
import { BusinessLineComponent } from './components/business-line/business-line.component';

const directives = [
    DebounceDirective
];

const components = [
    CustomersComponent,
    CustomerDetailComponent,
    CustomersListComponent,
    BusinessLineComponent
];

@NgModule({
    declarations: [components, directives],
    providers: [
        CustomerService,
        CustomerResolver
    ],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        NgSelectModule,
        SharedModule,
        ButtonsModule
    ]
})
export class CustomerModule {
}
