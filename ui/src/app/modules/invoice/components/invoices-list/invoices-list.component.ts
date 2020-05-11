import {Component, Input} from '@angular/core';
import {Invoice} from '../../../../domain/invoice/invoice';
import {Router} from '@angular/router';
import {DownloadInvoiceService} from '../../services/download-invoice.service';
import {InvoiceService} from '../../services/invoice.service';
import {InvoiceStatusEnum} from '../../../../domain/invoice/invoice-status.type';
import {AuthenticationService} from '../../../../common/services/authentication.service';

@Component({
    selector: 'invoices-list',
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent {

    @Input() referenceNumberColumnDisplayed: Boolean;
    @Input() invoices: Array<Invoice>;
    @Input() isPending: false;

    constructor(private router: Router,
                private invoiceService: InvoiceService,
                private authenticationService: AuthenticationService,
                private downloadService: DownloadInvoiceService) {
    }

    public goToDetail(invoice) {
        this.router.navigate(['/app/invoices/detail/' + invoice._id]);
    }

    public downloadInvoice(invoice): void {
        this.downloadService.downloadInvoice(invoice);
    }

    public launchInvoice(invoice: Invoice): void {
        this.invoiceService.updateInvoiceStatus(invoice, InvoiceStatusEnum.READY);
    }

    public isLaunchButtonVisible(invoice: Invoice): Boolean {
        const currentUser = this.authenticationService.getCurrentUser();
        return (currentUser.isDirector() || currentUser.isInvoicing())
            && invoice.status === InvoiceStatusEnum.DRAFT;
    }
}
