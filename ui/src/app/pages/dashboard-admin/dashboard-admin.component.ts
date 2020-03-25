import {Component, OnInit} from '@angular/core';
import {InvoiceModel} from '../../models/invoice.model';
import {InvoiceService} from '../../common/services/invoice.service';
import {isNumber} from 'util';
import * as moment from 'moment';

@Component({
    templateUrl: './dashboard-admin.component.html',
    styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

    readyInvoices: InvoiceModel[];
    validatedInvoices: InvoiceModel[];
    toSendInvoices: InvoiceModel[];
    paymentWaitingInvoices: InvoiceModel[];
    reviveInvoices: InvoiceModel[];

    constructor(private invoiceService: InvoiceService) {
    }

    ngOnInit() {
        this.invoiceService.fetchInvoices({statuses: 'READY'})
            .subscribe(invoices => {
                this.readyInvoices = invoices;
            });
        this.invoiceService.fetchInvoices({statuses: 'WAITING_VALIDATION'})
            .subscribe(invoices => {
                this.validatedInvoices = invoices;
            });
        this.invoiceService.fetchInvoices({statuses: ['VALIDATED']})
            .subscribe(invoices => this.toSendInvoices = invoices);
        this.invoiceService.fetchInvoices({statuses: 'SENT'})
            .subscribe(invoices => {
                this.paymentWaitingInvoices = invoices;
            });
        this.invoiceService.fetchInvoices({statuses: 'LATE'})
            .subscribe(invoices => this.reviveInvoices = invoices);
    }

    getAmount(invoices: InvoiceModel[]) {
        if (invoices) {
            const number = invoices
                .filter(invoice => isNumber(invoice.grossAmount))
                .map(invoice => invoice.grossAmount)
                .reduce((a, b) => a + b, 0);
            return number;
        }
    }
}
