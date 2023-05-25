import {Component, Input} from '@angular/core';
import {Invoice} from '../../../../domain/invoice/invoice';
import {Router} from '@angular/router';
import {DownloadInvoiceService} from '../../services/download-invoice.service';
import {InvoiceService} from '../../services/invoice.service';
import {
    InvoiceStatusEnum,
    InvoiceStatusesWorkflow,
    InvoiceStatusType
} from '../../../../domain/invoice/invoice-status.type';
import {AuthenticationService} from '../../../../common/services/authentication.service';

const ASC = 'ASC';
const DESC = 'DESC';

@Component({
    selector: 'invoices-list',
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss']
})

export class InvoicesListComponent {

    @Input() referenceNumberColumnDisplayed: Boolean;
    @Input() invoices: Array<Invoice>;
    @Input() isPending: false;

    public sortParam: string;
    public invoicesStatus = [];

    constructor(private router: Router,
                private invoiceService: InvoiceService,
                private authenticationService: AuthenticationService,
                private downloadService: DownloadInvoiceService) {
        this.sortParam = invoiceService.invoiceSearchFilter?.sortParam || 'reference_' + ASC;
    }

    public goToDetail(invoice) {
        this.router.navigate(['/invoices/detail/' + invoice._id]);
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

    public sort(attribute: string) {
        let sortParam = this.invoiceService.invoiceSearchFilter.sortParam;
        if (sortParam?.includes(attribute)) {
            if (sortParam.includes(ASC)) {
                this.invoiceService.invoiceSearchFilter.sortParam = attribute + '_' + DESC;
            } else if (sortParam.includes(DESC)) {
                this.invoiceService.invoiceSearchFilter.sortParam = attribute + '_'+ ASC;
            }
        } else {
            this.invoiceService.invoiceSearchFilter.sortParam = attribute + '_' + ASC;
        }
        this.sortParam = this.invoiceService.invoiceSearchFilter.sortParam;
        this.invoiceService.fetchInvoices(this.invoiceService.invoiceSearchFilter, true)
            .subscribe(
                (invoices) => {
                    this.invoices = invoices;
                    this.isPending = false;
                },
                () => this.isPending = false);
    }

    public upOrDown() {
        if (this.sortParam.includes(ASC)) {
            return 'up';
        } else if (this.sortParam.includes(DESC)) {
            return 'down';
        }
    }

    editStatus(invoice: Invoice) {
        this.invoicesStatus[invoice._id] = true
    }

    checkInvoicesStatus(invoice: Invoice) {
        return !!this.invoicesStatus[invoice._id];
    }

    public getInvoiceAvailableStatuses(invoice: Invoice) {
        return InvoiceStatusesWorkflow[invoice.status].authorizedTargets;
    }

    updateInvoice(invoice: Invoice, status: InvoiceStatusType) {
        const oldStatus = invoice.status;
        this.invoiceService.updateInvoiceStatus(invoice, status).subscribe(
            () => {
                this.invoicesStatus[invoice._id] = false;
            },
            (error) => {
                console.log(error)
                alert(error.message)
                invoice.status = oldStatus;
                this.invoicesStatus[invoice._id] = false;
            });
    }
}
