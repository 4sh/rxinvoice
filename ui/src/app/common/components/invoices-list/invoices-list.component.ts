import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Invoice} from '../../../domain/invoice/invoice';
import {Router} from '@angular/router';
import {DownloadInvoiceService} from '../../services/download-invoice.service';

@Component({
    selector: 'invoices-list',
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent {

    @Input() invoices: Invoice[];
    @Input() isPending: false;
    @Output() quickUpdate:  EventEmitter<Invoice> = new EventEmitter();

    constructor(private router: Router,
                private downloadService: DownloadInvoiceService) { }

    public goToDetail(invoice) {
        this.router.navigate(['/app/invoices/detail/' + invoice._id]);
    }

    public seeInvoice(invoice) {
        this.downloadService.seeInvoice(invoice);
    }

    public downloadInvoice(invoice) {
        this.downloadService.downloadInvoice(invoice);
    }
}
