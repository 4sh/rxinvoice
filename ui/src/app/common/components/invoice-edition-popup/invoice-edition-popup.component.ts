import {Component, OnInit} from '@angular/core';
import {Modal} from '../modal/modal.models/modal.model';
import {RepositoryService} from '../../services/repository.service';
import {InvoiceStatusType} from '../../../domain/invoice/invoice-status.type';
import {Invoice} from '../../../domain/invoice/invoice';
import {InvoiceService} from "../../services/invoice.service";

@Component({
    selector: 'invoice-edition-popup',
    templateUrl: './invoice-edition-popup.html',
    styleUrls: ['./invoice-edition-popup.scss']
})
export class InvoiceEditionPopupComponent extends Modal implements OnInit {

    public invoice: Invoice;
    public statuses: InvoiceStatusType[];

    constructor(private repositoryService: RepositoryService,
                private invoiceService: InvoiceService) {
        super();
    }

    ngOnInit() {
        this.repositoryService.fetchInvoiceStatus()
            .subscribe(statuses => this.statuses = statuses);
    }

    onInjectInputs(invoice): void {
        this.invoice = invoice;
    }

    save(): void {
        this.close(this.invoice);
    }

    cancel(): void {
        this.dismiss('canceling');
    }

    public isDraftInvoice(): boolean {
        return this.invoiceService.isDraftInvoice(this.invoice.status);
    }
}
