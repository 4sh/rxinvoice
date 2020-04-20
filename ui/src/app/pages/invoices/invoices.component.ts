import {Component, OnInit} from '@angular/core';
import {InvoiceStatusType} from '../../domain/invoice/invoice-status.type';
import {ServiceKind} from '../../domain/common/service.kind';
import {Invoice} from '../../domain/invoice/invoice';
import {InvoiceService} from '../../common/services/invoice.service';
import {RepositoryService} from '../../common/services/repository.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/debounceTime';
import {CurrencyPipe} from '@angular/common';
import * as moment from 'moment';
import {SearchParams} from "../../domain/search-params";

@Component({
    selector: 'invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

    public searchForm: FormGroup;

    public invoices: Invoice[];
    public statusTypes: InvoiceStatusType[];
    public kinds: ServiceKind[];
    public filterString = 'reference';
    public isPending = true;
    public showQuickPanelStatusEdit = false;
    public selectedForQuickUpdate: Invoice;

    constructor(private fb: FormBuilder,
                private invoiceService: InvoiceService,
                private repositoryService: RepositoryService) {
        this.searchForm = fb.group({
            query: '',
            startDate: moment().subtract(7, 'days').toDate(),
            endDate: '',
            buyerRef: '',
            statuses: '',
            kind: ''
        });
    }

    ngOnInit() {
        if (this.invoiceService.invoiceSearchFilter) {
            this.searchForm.patchValue(this.invoiceService.invoiceSearchFilter);
        }
        this.repositoryService.fetchInvoiceStatus()
            .subscribe(statuses => this.statusTypes = statuses);
        this.kinds = this.repositoryService.fetchInvoiceKind();
        this.searchForm.valueChanges
            .debounceTime(250)
            .distinctUntilChanged()
            .subscribe(() => {
                this.research();
            });
        this.research();
    }

    toggleFilter(string) {
        this.filterString = string;
    }

    research() {
        this.invoices = [];
        this.isPending = true;
        this.invoiceService.fetchInvoices(this.searchForm.value, true)
            .subscribe(
                (invoices) => {
                    this.invoices = invoices;
                    this.isPending = false;
                },
                () => this.isPending = false);
    }

    public getGrossAmount() {
        if (this.invoices) {
            const amount = this.invoices
                .filter(invoices => invoices.grossAmount)
                .map(invoice => invoice.grossAmount)
                .reduce((a, b) => a + b, 0);
            return (new CurrencyPipe('en')).transform(`${amount}`, 'EUR', 'symbol', '.2-2', 'fr');
        } else {
            return 0;
        }
    }

    public selectForQuickUpdate(invoice) {
        this.selectedForQuickUpdate = invoice;
    }

    public closeQuickUpdate(): void {
        this.selectedForQuickUpdate = undefined;
        this.research();
    }

    public updatedInvoice(invoice: Invoice) {
        this.invoiceService.saveInvoice(invoice)
            .subscribe(value => {
                this.selectedForQuickUpdate = value;
                this.closeQuickUpdate();
            });
    }

    public buildUri(): string {
        return "/api/exports/invoices?" + SearchParams.toHttpParams(this.searchForm.value).toString();
    }
}
