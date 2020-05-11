import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DraftsComponent} from './components/drafts/drafts.component';
import {DraftModule} from './draft.module';

@NgModule({
    imports: [
        DraftModule,
        RouterModule.forChild([
                {path: '', component: DraftsComponent, data : {title: 'nav.drafts'}}
            ]
        )
    ]
})
export class DraftRoutingModule {
}
