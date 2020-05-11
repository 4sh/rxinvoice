import { Component, EventEmitter, forwardRef, Inject, Input, Output } from '@angular/core';
import { ATabsComponent } from './a-tabs.component';
import {AbstractComponent} from '../../../../../common/components/abstract-component';

@Component({
    selector: 'a-tab',
    templateUrl: './a-tab.component.html'
})
export class ATabComponent extends AbstractComponent  {

    @Input() tabTitle: string;
    @Input() tabId: string;
    @Input() disabled = false;
    @Input() numberOfElements: number;
    @Input() amount: number;
    @Output() onQueryChanged: EventEmitter<string> = new EventEmitter();
    active: boolean;

    constructor(@Inject(forwardRef(() => ATabsComponent)) private tabs: ATabsComponent) {
        super();
        tabs.addTab(this);
    }
}
