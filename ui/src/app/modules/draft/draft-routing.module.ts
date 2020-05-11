import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DraftsComponent} from './components/drafts/drafts.component';
import {DraftModule} from './draft.module';
import {DraftGuard} from './guards/draft.guard';

@NgModule({
    imports: [
        DraftModule,
        RouterModule.forChild([
                {
                    path: '',
                    canActivate: [DraftGuard],
                    component: DraftsComponent,
                    data: {title: 'nav.drafts'}
                }
            ]
        )
    ]
})
export class DraftRoutingModule {
}
