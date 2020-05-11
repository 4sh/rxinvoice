import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {InvoicesComponent} from './components/invoices/invoices.component';
import {InvoiceDetailComponent} from './components/invoice-detail/invoice-detail.component';
import {DraftsComponent} from '../draft/components/drafts/drafts.component';
import {InvoiceModule} from './invoice.module';

@NgModule({
    imports: [
        InvoiceModule,
        RouterModule.forChild([
                {path: '', component: InvoicesComponent},
                {path: 'new', component: InvoiceDetailComponent},
                {path: 'detail/:id', component: InvoiceDetailComponent},
                {path: 'drafts', component: DraftsComponent}
            ]
        )
    ]
})
export class InvoiceRoutingModule {
}
