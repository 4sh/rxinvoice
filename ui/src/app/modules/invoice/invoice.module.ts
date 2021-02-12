import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoicesListComponent} from './components/invoices-list/invoices-list.component';
import {InvoicesComponent} from './components/invoices/invoices.component';
import {InvoiceDetailComponent} from './components/invoice-detail/invoice-detail.component';
import {AttachmentsDetailComponent} from './components/attachments-detail/attachments-detail.component';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedModule} from '../shared/shared.module';
import {FileUploadModule} from 'ng2-file-upload';
import {InvoiceService} from './services/invoice.service';
import {DownloadInvoiceService} from './services/download-invoice.service';
import {ButtonsModule} from '../shared/components/atoms/buttons/buttons.module';
import {InvoiceResolver} from './resolvers/invoice.resolver';
import {AInvoiceLineComponent} from './components/a-invoice-line/a-invoice-line.component';
import {CustomerModule} from '../customer/customer.module';
import {DndModule} from 'ngx-drag-drop';

const components = [
    InvoicesListComponent,
    InvoicesComponent,
    InvoiceDetailComponent,
    AInvoiceLineComponent,
    AttachmentsDetailComponent];

@NgModule({
    declarations: [components],
    exports: [components],
    providers: [
        InvoiceService,
        DownloadInvoiceService,
        InvoiceResolver
    ],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        FileUploadModule,
        SharedModule,
        ButtonsModule,
        CustomerModule,
        DndModule
    ]
})
export class InvoiceModule {
}
