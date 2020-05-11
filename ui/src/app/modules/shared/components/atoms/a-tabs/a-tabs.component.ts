import {AfterViewInit, Component, Input} from '@angular/core';
import {ATabComponent} from './a-tab.component';
import {Router} from '@angular/router';
import {AbstractComponent} from '../../../../../common/components/abstract-component';

@Component({
    selector: 'a-tabs',
    templateUrl: './a-tabs.component.html',
    styleUrls: ['./a-tabs.component.scss']
})
export class ATabsComponent extends AbstractComponent implements AfterViewInit {

    activeTab?: ATabComponent;
    tabs: ATabComponent[] = [];

    constructor(private router: Router) {
        super();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (this.tabs.length > 0) {
                this.selectTab(this.tabs[0]);
            }
        });
    }

    public addTab(tab: ATabComponent) {
        this.tabs.push(tab);
    }

    public selectTab(selection: ATabComponent) {
        if (!selection.disabled) {
            this.tabs.forEach(tab => tab.active = false);
            if (selection.tabId) {
                const queryParams = {activeTabId: selection.tabId, activeTabTitle: selection.tabTitle};
                this.router.navigate([], {replaceUrl: true, queryParams: queryParams});
            }
            selection.active = true;
            this.activeTab = selection;
        }
    }
}
