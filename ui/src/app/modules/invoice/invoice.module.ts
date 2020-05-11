import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoicesListComponent} from './components/invoices-list/invoices-list.component';
import {InvoicesComponent} from './components/invoices/invoices.component';
import {InvoiceDetailComponent} from './components/invoice-detail/invoice-detail.component';
import {InvoiceLinesDetailComponent} from './components/invoice-lines-detail/invoice-lines-detail.component';
import {AttachmentsDetailComponent} from './components/attachments-detail/attachments-detail.component';
import {InvoiceLineFormComponent} from './components/invoice-lines-detail/invoice-line-form/invoice-line-form.component';
import {InvoiceLineHeaderComponent} from './components/invoice-lines-detail/invoice-line-header/invoice-line-header.component';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedModule} from '../shared/shared.module';
import {FileUploadModule} from 'ng2-file-upload';
import {InvoiceService} from './services/invoice.service';
import {DownloadInvoiceService} from './services/download-invoice.service';
import {ButtonsModule} from '../shared/components/atoms/buttons/buttons.module';

const components = [
    InvoicesListComponent,
    InvoicesComponent,
    InvoiceDetailComponent,
    InvoiceLinesDetailComponent,
    AttachmentsDetailComponent,
    InvoiceLineFormComponent,
    InvoiceLineHeaderComponent];

@NgModule({
    declarations: [components],
    exports: [components],
    providers: [
        InvoiceService,
        DownloadInvoiceService
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
        ButtonsModule
    ]
})
export class InvoiceModule {
}
