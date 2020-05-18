import {Component, OnInit, ViewChild} from '@angular/core';
import {Company} from '../../../../domain/company/company';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../../../common/services/company.service';
import {Invoice} from '../../../../domain/invoice/invoice';
import {InvoiceService} from '../../services/invoice.service';
import {RepositoryService} from '../../../../common/services/repository.service';
import {SweetAlertService} from '../../../shared/services/sweetAlert.service';
import {AttachmentsDetailComponent} from '../attachments-detail/attachments-detail.component';
import {Location} from '@angular/common';
import {AuthenticationService} from '../../../../common/services/authentication.service';
import {DownloadInvoiceService} from '../../services/download-invoice.service';
import {InvoiceStatusType} from "../../../../domain/invoice/invoice-status.type";

@Component({
    selector: 'invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {

    private seller: Company;
    public invoice: Invoice;
    public canDelete: Boolean;
    public statuses: InvoiceStatusType[];

    @ViewChild(AttachmentsDetailComponent) attachmentsComponent: AttachmentsDetailComponent;

    constructor(private companyService: CompanyService,
                private repositoryService: RepositoryService,
                private invoiceService: InvoiceService,
                private route: ActivatedRoute,
                private router: Router,
                private alertService: SweetAlertService,
                private location: Location,
                private authService: AuthenticationService,
                private downloadService: DownloadInvoiceService) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.invoice = data.invoice;
        });
        this.authService.userEvents
            .subscribe(currentUser => {
                this.companyService.fetchCompany(currentUser.companyRef).subscribe(value => this.seller = value);
                this.canDelete = currentUser.roles.filter(role => role === 'admin' || role === 'seller').length > 0;
            });
        this.repositoryService.fetchInvoiceStatus()
            .subscribe(statuses => this.statuses = statuses);
    }

    // private invoiceReferenceAsyncValidator() {
    //     return (input: FormControl) => {
    //         if (this.invoice._id || !input.value) {
    //             return of(null);
    //         }
    //         return timer(200).pipe(
    //             switchMap(() => this.invoiceService.fetchInvoices({reference: input.value})),
    //             map(res => {
    //                 return res.length === 0 ? null : {referenceExist: true}
    //             }))
    //     };
    // };

    public create(): void {
        // this.form.disable();
        if (!this.invoice) {
            this.invoice = new Invoice();
        }
        this.invoiceService.createInvoice(this.invoice).subscribe((invoice) => {
                this.invoice = invoice;
                this.invoice._id = invoice._id;
                this.alertService.success({title: 'alert.creation.success', customClass: 'swal2-for-edit'});
            },
            () => {
                this.alertService.error({title: 'alert.creation.error', customClass: 'swal2-for-edit'});
            });
    }

    public save(): void {
        // this.form.disable();
        if (!this.invoice) {
            this.invoice = new Invoice();
        }
        // _.merge(this.invoice, this.invoice, this.form.value);
        this.invoiceService.saveInvoice(this.invoice)
            .subscribe(() => {
                    this.alertService.success({title: 'alert.update.success', customClass: 'swal2-for-edit'});
                },
                () => {
                    this.alertService.error({title: 'alert.update.error', customClass: 'swal2-for-edit'});
                }
            );
    }

    public reset(): void {
        // this.setForm();
    }

    public delete(): void {
        this.alertService.confirm({title: 'alert.confirm.deletion'}).then(
            (result) => {
                if (result.value) {
                    this.invoiceService.deleteInvoice(this.invoice)
                        .subscribe(() => {
                            this.router.navigate(['app/invoices']);
                        });
                }
            }
        );
    }

    public deleteAttachment(attachmentId): void {
        this.invoiceService.deleteAttachment(this.invoice._id, attachmentId)
            .subscribe(() => {
                this.invoice.attachments =
                    this.invoice.attachments.filter(file => file._id !== attachmentId);
            });
    }

    public getSentDate() {
        if (!this.invoice.statusChanges) {
            return;
        }
        const status = this.invoice.statusChanges.find(stat => stat.to === 'SENT');
        if (status) {
            return status.timestamp;
        }
    }

    public goBack(): void {
        this.location.back();
    }

    public download() {
        this.downloadService.downloadInvoice(this.invoice);
    }

    public duplicate() {
        this.invoice = this.invoice.copy();
    }
}
