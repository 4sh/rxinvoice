import {Component, OnInit} from '@angular/core';
import {InvoiceModel} from '../../models/invoice.model';
import {InvoiceService} from '../../common/services/invoice.service';
import {DashboardCommons} from '../../common/components/dashboard/dashboard-commons';
import {InvoiceStatusEnum} from '../../models/invoice-status.type';

@Component({
    templateUrl: './dashboard-pilot.component.html',
    styleUrls: ['./dashboard-pilot.component.scss']
})
export class DashboardPilotComponent extends DashboardCommons implements OnInit {

    public draftInvoices: Array<InvoiceModel> = [];
    public toPrepareInvoices: Array<InvoiceModel> = [];
    public waitingValidationInvoices: Array<InvoiceModel> = [];

    constructor(invoiceService: InvoiceService) {
        super(invoiceService);
    }

    ngOnInit() {
        this.statusColumnMap
            .set(InvoiceStatusEnum.DRAFT, this.draftInvoices)
            .set(InvoiceStatusEnum.READY, this.toPrepareInvoices)
            .set(InvoiceStatusEnum.WAITING_VALIDATION, this.waitingValidationInvoices);
        this.fetchColumn(InvoiceStatusEnum.DRAFT);
        this.fetchColumn(InvoiceStatusEnum.READY);
        this.fetchColumn(InvoiceStatusEnum.WAITING_VALIDATION);
    }

    public draftColumnUpdated(invoice: InvoiceModel): void {
        this.fetchColumn(InvoiceStatusEnum.DRAFT);
        if (invoice.status !== InvoiceStatusEnum.DRAFT) {
            this.fetchColumn(invoice.status);
        }
    }

    public toPrepareColumnUpdated(invoice: InvoiceModel): void {
        this.fetchColumn(InvoiceStatusEnum.READY);
        if (invoice.status !== InvoiceStatusEnum.READY) {
            this.fetchColumn(invoice.status);
        }
    }

    public waitingValidationColumnUpdated(invoice: InvoiceModel): void {
        this.fetchColumn(InvoiceStatusEnum.WAITING_VALIDATION);
        if (invoice.status !== InvoiceStatusEnum.WAITING_VALIDATION) {
            this.fetchColumn(invoice.status);
        }
    }

}
