import {Component, OnInit, ViewChild} from '@angular/core';
import {Company} from '../../../../domain/company/company';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../../../common/services/company.service';
import {Invoice} from '../../../../domain/invoice/invoice';
import {InvoiceService} from '../../services/invoice.service';
import {SweetAlertService} from '../../../shared/services/sweetAlert.service';
import {AttachmentsDetailComponent} from '../attachments-detail/attachments-detail.component';
import {Location} from '@angular/common';
import {AuthenticationService} from '../../../../common/services/authentication.service';
import {DownloadInvoiceService} from '../../services/download-invoice.service';
import * as Moment from 'moment';
import {InvoiceLine} from '../../../../domain/invoice/invoice-line';
import {Observable} from 'rxjs/internal/Observable';
import {FileUploader} from 'ng2-file-upload';
import {switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Component({
    selector: 'invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {

    public seller: Company;
    public invoice: Invoice;
    public canDelete: Boolean;
    public newLine: InvoiceLine = new InvoiceLine();
    public uploader: FileUploader;
    public filesToDelete: string[] = [];


    @ViewChild(AttachmentsDetailComponent) attachmentsComponent: AttachmentsDetailComponent;

    constructor(private companyService: CompanyService,
                private invoiceService: InvoiceService,
                private route: ActivatedRoute,
                private router: Router,
                private alertService: SweetAlertService,
                private location: Location,
                private authService: AuthenticationService,
                private downloadService: DownloadInvoiceService) {
    }

    ngOnInit() {
        this.route.data.subscribe(routeData => {
            this.invoice = routeData.invoice;
            this.invoice.vatAmount = this.invoice.computeVatAmount();
            this.authService.companyEvents
                .subscribe(companyEvent => this.seller = companyEvent)
        });
        this.authService.userEvents
            .subscribe(currentUser =>
                this.canDelete = currentUser.roles.filter(role => role === 'admin' || role === 'seller').length > 0
            );

        this.uploader = new FileUploader({autoUpload: false});
    }

    public invoiceDateChanged(invoiceDateChangeEvent: Date) {
        if (!this.invoice.date) {
            this.invoice.dueDate = Moment(invoiceDateChangeEvent).add(30, 'days').toDate();
        }
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
    //     };O
    // };


    public save(): void {
        if (!this.invoice._id) {
            this.handleInvoiceSave(this.invoiceService.createInvoice(this.invoice), true);
        } else {
            this.handleInvoiceSave(this.invoiceService.updateInvoice(this.invoice), false);
        }
    }

    private handleInvoiceSave(observable: Observable<Invoice>, creation: boolean): void {
        observable.pipe(
                tap((invoice: Invoice) => this.invoice._id = invoice._id),
                switchMap(() => {
                    return this.invoiceService.uploadDocuments(this.invoice._id, this.uploader.queue)
                }),
                tap(() => this.uploader =  new FileUploader({autoUpload: false})),
                switchMap(() => {
                    if (this.filesToDelete.length > 0) {
                        return this.invoiceService.deleteAttachment(this.invoice._id, this.filesToDelete);
                    }
                    return of(true);
                }),
                tap(() => {
                    this.filesToDelete = [];
                }),
                switchMap(() => this.invoiceService.fetchInvoice(this.invoice._id))
            ).subscribe((invoice: Invoice) => {
                this.invoice = invoice;
                if (creation) {
                    this.alertService.success({title: 'alert.creation.success', customClass: 'swal2-for-edit'});
                } else {
                    this.alertService.success({title: 'alert.update.success', customClass: 'swal2-for-edit'});
                }
            },
            () => {
                if (creation) {
                    this.alertService.error({title: 'alert.creation.error', customClass: 'swal2-for-edit'});
                } else {
                    this.alertService.error({title: 'alert.update.error', customClass: 'swal2-for-edit'});
                }
            });
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

    public goBack(): void {
        this.location.back();
    }

    public download() {
        this.downloadService.downloadInvoice(this.invoice);
    }

    public duplicate() {
        this.invoice = this.invoice.copy();
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

    private computeTotalAmounts() {
        this.invoice.grossAmount = this.invoice.computeGrossAmount();
        if (this.invoice.withVAT) {
            this.invoice.vatAmount = this.invoice.computeVatAmount();
        }
        this.invoice.netAmount = this.invoice.computeNetAmount();
    }

    public lineAdded(): void {
        this.newLine = new InvoiceLine();
        this.computeTotalAmounts()
    }

    public lineRemoved() {
        this.computeTotalAmounts()
    }

    public lineUpdated() {
        this.computeTotalAmounts();
    }

    public withVATChanged(withVAT: boolean) {
        this.invoice.withVAT = withVAT;
        this.computeTotalAmounts();
    }

    public deleteFiles(files: string[]) {
        this.filesToDelete = files;
    }
}
