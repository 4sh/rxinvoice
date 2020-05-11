import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {DraftService} from './services/draft.service';
import {DraftsComponent} from './components/drafts/drafts.component';
import {InvoiceModule} from '../invoice/invoice.module';
import {DraftGuard} from './guards/draft.guard';

const components = [DraftsComponent];

@NgModule({
    declarations: components,
    exports: components,
    providers: [DraftService, DraftGuard],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        SharedModule,
        InvoiceModule
    ]
})
export class DraftModule {
}
