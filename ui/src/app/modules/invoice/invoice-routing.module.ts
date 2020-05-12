import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {InvoicesComponent} from './components/invoices/invoices.component';
import {InvoiceDetailComponent} from './components/invoice-detail/invoice-detail.component';
import {InvoiceModule} from './invoice.module';
import {InvoiceResolver} from './resolvers/invoice.resolver';

@NgModule({
    imports: [
        InvoiceModule,
        RouterModule.forChild([
                {path: '', component: InvoicesComponent},
                {
                    path: 'detail/:invoiceId',
                    component: InvoiceDetailComponent,
                    resolve: {
                        invoice: InvoiceResolver
                    }
                }
            ]
        )
    ]
})
export class InvoiceRoutingModule {
}
