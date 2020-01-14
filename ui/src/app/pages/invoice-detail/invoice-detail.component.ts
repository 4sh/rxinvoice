import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyModel} from '../../models/company.model';
import {ActivatedRoute, Router} from '@angular/router';
import {
    ControlContainer,
    FormBuilder,
    FormControl,
    FormGroup,
    NgForm,
    Validators
} from '@angular/forms';
import {CompanyService} from '../../common/services/company.service';
import {InvoiceModel} from '../../models/invoice.model';
import {InvoiceService} from '../../common/services/invoice.service';
import {InvoiceKindType} from '../../models/invoice-kind.type';
import {RepositoryService} from '../../common/services/repository.service';
import {InvoiceStatusType} from '../../models/invoice-status.type';
import * as _ from 'lodash';
import {SweetAlertService} from '../../common/services/sweetAlert.service';
import {AttachmentsDetailComponent} from '../../common/components/attachments-detail/attachments-detail.component';
import {Location} from '@angular/common';
import {AuthenticationService} from '../../common/services/authentication.service';
import {DateUtils} from "../../common/utils/date-utils";
import {DownloadInvoiceService} from "../../common/services/download-invoice.service";
import {map, switchMap} from "rxjs/operators";
import {timer} from "rxjs/observable/timer";
import {Observable} from "rxjs";

@Component({
    selector: 'invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['./invoice-detail.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class InvoiceDetailComponent implements OnInit {

    public form: FormGroup;
    public companies: CompanyModel[];
    public kinds: InvoiceKindType[];
    public invoice = new InvoiceModel();
    public invoiceId: string;
    public statuses: InvoiceStatusType[];
    public selectedCompany: CompanyModel;
    public canDelete: boolean;

    @ViewChild(AttachmentsDetailComponent) attachmentsComponent: AttachmentsDetailComponent;

    constructor(private fb: FormBuilder,
                private companyService: CompanyService,
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
        this.fetchInvoice();
        this.authService.userEvents
            .subscribe(currentUser =>
                this.canDelete = currentUser.roles.filter(role => role === 'admin' || role === 'seller').length > 0);

        this.kinds = this.repositoryService.fetchInvoiceKind();
        this.repositoryService.fetchInvoiceStatus()
            .subscribe(statuses => this.statuses = statuses);
        this.companyService.fetchCompanies()
            .subscribe(companies => this.companies = companies);
        this.form = this.fb.group({
            buyer: new FormControl('', Validators.required),
            business: new FormControl(''),
            object: new FormControl('', Validators.required),
            kind: new FormControl('', Validators.required),
            dueDate: new FormControl(''),
            date: new FormControl(''),
            status: new FormControl('', Validators.required),
            comment: new FormControl(''),
            reference: new FormControl('', null, this.invoiceReferenceAsyncValidator()),
            withVAT: new FormControl(false),
            customerInvoiceRef: new FormControl('')
        });
        if (!this.invoiceId) {
            this.form.enable();
        }
    }

    private invoiceReferenceAsyncValidator() {
        return (input: FormControl) => {
            if (this.invoiceId || !input.value) {
                return Observable.of(null);
            }
            return timer(200).pipe(
                switchMap(() => this.invoiceService.fetchInvoices({reference: input.value})),
                map(res => {
                    return res.length === 0 ? null : {referenceExist: true}
                }))
        };
    };

    private setForm(): void {
        this.form.setValue({
            buyer: this.invoice.buyer,
            object: this.invoice.object,
            business: this.invoice.business,
            kind: this.invoice.kind,
            date: DateUtils.stringToDate(this.invoice.date),
            dueDate: DateUtils.stringToDate(this.invoice.dueDate),
            status: this.invoice.status,
            comment: this.invoice.comment,
            reference: this.invoice.reference,
            withVAT: this.invoice.withVAT,
            customerInvoiceRef: this.invoice.customerInvoiceRef
        });
        this.form.disable();
    }

    public fetchInvoice(): void {
        this.route.params.subscribe(params => {
            if (!this.invoiceId) {
                this.invoiceId = params['id'];
            }
            if (this.invoiceId) {
                this.invoiceService.fetchInvoice(this.invoiceId)
                    .subscribe((invoice: InvoiceModel) => {
                        this.invoice = invoice;
                        if (invoice.buyer) {
                            this.fetchBuyer(invoice.buyer);
                        }
                        this.setForm();
                    });
            }
        });
    }

    public create(): void {
        this.form.disable();
        if (!this.invoice) {
            this.invoice = new InvoiceModel();
        }
        _.merge(this.invoice, this.invoice, this.form.value);
        this.invoiceService.createInvoice(this.invoice).subscribe((invoice) => {
                this.invoice = invoice;
                this.invoiceId = invoice._id;
                this.setForm();
                this.alertService.success({title: 'alert.creation.success', customClass: 'swal2-for-edit'});
            },
            () => {
                this.alertService.error({title: 'alert.creation.error', customClass: 'swal2-for-edit'});
            });
    }

    public save(): void {
        this.form.disable();
        if (!this.invoice) {
            this.invoice = new InvoiceModel();
        }
        _.merge(this.invoice, this.invoice, this.form.value);
        this.invoiceService.saveInvoice(this.invoice)
            .subscribe(() => {
                    this.fetchInvoice();
                    console.log(this.invoice);
                    this.alertService.success({title: 'alert.update.success', customClass: 'swal2-for-edit'});
                },
                () => {
                    this.alertService.error({title: 'alert.update.error', customClass: 'swal2-for-edit'});
                }
            );
    }

    public reset(): void {
        this.setForm();
    }

    public comparRef(item1, item2): boolean {
        return item1.reference === item2.reference;
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
        this.invoiceService.deleteAttachment(this.invoiceId, attachmentId)
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

    public fetchBuyer(value): void {
        if (value) {
            this.companyService.fetchCompany(value._id)
                .subscribe(company => {
                    this.selectedCompany = company;
                });
        } else {
            this.selectedCompany = undefined;
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
        this.setForm();
        this.form.enable();
    }
}
