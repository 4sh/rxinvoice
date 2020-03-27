import {Component, OnInit} from '@angular/core';
import {InvoiceModel} from '../../models/invoice.model';
import {InvoiceService} from '../../common/services/invoice.service';
import {InvoiceStatusEnum} from '../../models/invoice-status.type';
import {DashboardCommons} from '../../common/components/dashboard/dashboard-commons';

@Component({
    templateUrl: './dashboard-admin.component.html',
    styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent extends DashboardCommons implements OnInit {

    public toPrepareInvoices: Array<InvoiceModel> = [];
    public waitingValidationInvoices: Array<InvoiceModel> = [];
    public toSendInvoices: Array<InvoiceModel> = [];
    public paymentWaitingInvoices: Array<InvoiceModel> = [];
    public lateInvoices: Array<InvoiceModel> = [];

    constructor(invoiceService: InvoiceService) {
        super(invoiceService);
    }

    ngOnInit() {
        this.statusColumnMap
            .set(InvoiceStatusEnum.READY, this.toPrepareInvoices)
            .set(InvoiceStatusEnum.WAITING_VALIDATION, this.waitingValidationInvoices)
            .set(InvoiceStatusEnum.VALIDATED, this.toSendInvoices)
            .set(InvoiceStatusEnum.SENT, this.paymentWaitingInvoices)
            .set(InvoiceStatusEnum.LATE, this.lateInvoices);
        this.fetchColumn(InvoiceStatusEnum.READY);
        this.fetchColumn(InvoiceStatusEnum.WAITING_VALIDATION);
        this.fetchColumn(InvoiceStatusEnum.VALIDATED);
        this.fetchColumn(InvoiceStatusEnum.SENT);
        this.fetchColumn(InvoiceStatusEnum.LATE);
    }
}
