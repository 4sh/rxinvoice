import {Component, OnInit} from '@angular/core';
import {InvoiceStatusEnum} from '../../models/invoice-status.type';
import {DashboardColumnConfiguration} from '../../common/components/dashboard/dashboard-column-configuration';

@Component({
    templateUrl: './dashboard-pilot.component.html',
    styleUrls: ['./dashboard-pilot.component.scss']
})
export class DashboardPilotComponent implements OnInit {

    public columns: Array<DashboardColumnConfiguration> = [];

    ngOnInit() {
        this.columns.push(
            new DashboardColumnConfiguration('dashboard.column.draft', InvoiceStatusEnum.DRAFT),
            new DashboardColumnConfiguration('dashboard.column.preparation.waiting', InvoiceStatusEnum.READY, true),
            new DashboardColumnConfiguration('dashboard.column.to.validate', InvoiceStatusEnum.WAITING_VALIDATION))  ;
    }
}
