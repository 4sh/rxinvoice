import {Component, OnInit} from '@angular/core';
import {Modal} from '../modal/modal.models/modal.model';
import {InvoiceModel} from '../../../models/invoice.model';
import {InvoiceStatusType} from '../../../models/invoice-status.type';
import {RepositoryService} from '../../services/repository.service';

@Component({
    selector: 'invoice-edition-popup',
    templateUrl: './invoice-edition-popup.html',
    styleUrls: ['./invoice-edition-popup.scss']
})
export class InvoiceEditionPopupComponent extends Modal implements OnInit {

    public invoice: InvoiceModel;
    public statuses: InvoiceStatusType[];

    constructor(private repositoryService: RepositoryService) {
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
}
