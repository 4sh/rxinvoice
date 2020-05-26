import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {Invoice} from '../../../../domain/invoice/invoice';
import {InvoiceService} from '../../services/invoice.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import * as moment from 'moment';
import {SearchParams} from '../../../../domain/search-params';

@Component({
    selector: 'invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

    public searchForm: FormGroup;

    public invoices: Invoice[];
    public filterString = 'reference';
    public isPending = true;

    constructor(private fb: FormBuilder,
                private invoiceService: InvoiceService) {
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
        this.searchForm.valueChanges.pipe(
            debounceTime(250),
            distinctUntilChanged())
            .subscribe(() => {
                this.research();
            });
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

    public buildUri(): string {
        return '/api/exports/invoices?' + SearchParams.toHttpParams(this.searchForm.value).toString();
    }
}
