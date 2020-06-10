import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CustomersComponent} from './components/customers/customers.component';
import {CustomerModule} from './customer.module';
import {CustomerDetailComponent} from './components/customer-detail/customer-detail.component';
import {CustomerResolver} from './resolvers/customer.resolver';

@NgModule({
    imports: [
        CustomerModule,
        RouterModule.forChild([
                {
                    path: '', component: CustomersComponent
                },
                {
                    path: 'detail/:customerId',
                    component: CustomerDetailComponent,
                    resolve: {
                        customer: CustomerResolver
                    }
                }
            ]
        )
    ]
})
export class CustomerRoutingModule {
}
