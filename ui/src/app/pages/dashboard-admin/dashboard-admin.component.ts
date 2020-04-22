import {Component, OnInit} from '@angular/core';
import {InvoiceStatusEnum} from '../../models/invoice-status.type';
import {DashboardColumnConfiguration} from '../../common/components/dashboard/dashboard-column-configuration';

@Component({
    templateUrl: './dashboard-admin.component.html',
    styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

    public columns: Array<DashboardColumnConfiguration> = [];

    ngOnInit() {
        this.columns.push(
            new DashboardColumnConfiguration('dashboard.column.to.prepare', InvoiceStatusEnum.READY),
            new DashboardColumnConfiguration('dashboard.column.validation.waiting', InvoiceStatusEnum.WAITING_VALIDATION, false, true),
            new DashboardColumnConfiguration('dashboard.column.to.send', InvoiceStatusEnum.VALIDATED),
            new DashboardColumnConfiguration('dashboard.column.payment.waiting', InvoiceStatusEnum.SENT),
            new DashboardColumnConfiguration('dashboard.column.late', InvoiceStatusEnum.LATE));
    }
}
