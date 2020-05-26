import {Component} from '@angular/core';
import {Modal} from '../modal/modal.models/modal.model';
import {Invoice} from '../../../domain/invoice/invoice';
import {InvoiceService} from '../../../modules/invoice/services/invoice.service';

@Component({
    selector: 'invoice-edition-popup',
    templateUrl: './invoice-edition-popup.html',
    styleUrls: ['./invoice-edition-popup.scss']
})
export class InvoiceEditionPopupComponent extends Modal  {

    public invoice: Invoice;

    constructor(private invoiceService: InvoiceService) {
        super();
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
