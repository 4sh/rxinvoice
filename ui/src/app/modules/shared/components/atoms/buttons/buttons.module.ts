import {NgModule} from '@angular/core';
import {AButtonCancelComponent} from './a-button-cancel/a-button-cancel.component';
import {AButtonDefaultComponent} from './a-button-default/a-button-default.component';
import {AButtonSubmitComponent} from './a-button-submit/a-button-submit.component';
import {AButtonIconComponent} from './a-button-icon/a-button-icon.component';
import {ALinkCancelComponent} from './a-link-cancel/a-link-cancel.component';
import {ALinkDefaultComponent} from './a-link-default/a-link-default.component';
import {ALinkIconComponent} from './a-link-icon/a-link-icon.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';


const components = [
    AButtonCancelComponent,
    AButtonDefaultComponent,
    AButtonSubmitComponent,
    AButtonIconComponent,
    ALinkCancelComponent,
    ALinkDefaultComponent,
    ALinkIconComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule.forChild()
    ],
    declarations: components,
    exports: components
})

export class ButtonsModule {
}
