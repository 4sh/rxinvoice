import {Component, OnInit} from '@angular/core';
import {DashboardColumnConfiguration} from '../../../../domain/company/dashboard/dashboard-column-configuration';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {DashboardConfiguration} from '../../../../domain/company/dashboard/dashboard-configuration';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public currentDashboard: DashboardConfiguration;
    public dashboards: Array<DashboardConfiguration> = [];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.dashboards = data.dashboards;
            this.currentDashboard = data.dashboards[0];
        });
    }
}
