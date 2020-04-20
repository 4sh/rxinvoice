import {AfterViewInit, Component, Input} from '@angular/core';
import {TabComponent} from './tab.component';
import {Router} from '@angular/router';
import {AbstractComponent} from '../../../../common/components/abstract-component';

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent extends AbstractComponent implements AfterViewInit {

    activeTab?: TabComponent;
    tabs: TabComponent[] = [];

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

    public addTab(tab: TabComponent) {
        this.tabs.push(tab);
    }

    public selectTab(selection: TabComponent) {
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
