import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {plainToClass} from 'class-transformer';
import {HttpClient} from '@angular/common/http';
import {Invoice} from '../../domain/invoice/invoice';
import {SearchParams} from '../../domain/search-params';
import {InvoiceSearchFilter} from '../../domain/invoice/invoice-search-filter';
import {SalesExportParameters} from '../../pages/analyze/sales-export-parameters';

@Injectable()
export class InvoiceService {

    public invoiceSearchFilter: InvoiceSearchFilter;

    private baseUrl = '/api/invoices';

    constructor(private http: HttpClient) {
    }

    public fetchInvoices(params: any, save?: boolean): Observable<Invoice[]> {
        if (save) {
            this.invoiceSearchFilter = new InvoiceSearchFilter();
            this.invoiceSearchFilter.startDate = params.startDate;
            this.invoiceSearchFilter.endDate = params.endDate;
            this.invoiceSearchFilter.query = params.query;
            this.invoiceSearchFilter.kind = params.kind;
            this.invoiceSearchFilter.buyerRef = params.buyerRef;
            this.invoiceSearchFilter.statuses = params.statuses;
        }
        return this.http
            .get(this.baseUrl, {params: SearchParams.toHttpParams(params)})
            .map((result: any) => plainToClass(Invoice, result as Object[]))
            .catch((response: Response) => Observable.throw({message: 'Unable to fetch invoices', response: response}));
    }

    public fetchToPrepareInvoices(): Observable<Invoice[]> {
        return this.http
            .get(this.baseUrl + '/toPrepare')
            .map((result: any) => plainToClass(Invoice, result as Object[]))
            .catch((response: Response) => Observable.throw({
                message: 'Unable to fetch to prepare invoices',
                response: response
            }));
    }

    public fetchInvoice(id): Observable<Invoice> {
        return this.http
            .get(this.baseUrl + '/' + id)
            .map((result: any) => plainToClass(Invoice, result as Object))
            .catch((response: Response) => Observable.throw({message: 'Unable to fetch invoice', response: response}));
    }

    public saveInvoice(invoice): Observable<Invoice> {
        return this.http
            .put(`${this.baseUrl}/${invoice._id}`, invoice)
            .map((result: any) => plainToClass(Invoice, result as Object))
            .catch((response: Response) => Observable.throw({message: 'Unable to save invoice', response: response}));
    }

    public createInvoice(invoice): Observable<Invoice> {
        return this.http
            .post(this.baseUrl, invoice)
            .map((result: any) => plainToClass(Invoice, result as Object))
            .catch((response: Response) => Observable.throw({message: 'Unable to create invoice', response: response}));
    }

    public deleteInvoice(invoice): Observable<Invoice> {
        return this.http
            .delete(this.baseUrl + '/' + invoice._id)
            .map((result: any) => plainToClass(Invoice, result as Object))
            .catch((response: Response) => Observable.throw({message: 'Unable to delete invoice', response: response}));
    }

    public deleteAttachment(invoiceId, attachmentId): Observable<Invoice> {
        return this.http
            .delete(this.baseUrl + '/' + invoiceId + '/attachments/' + attachmentId)
            .map((result: any) => plainToClass(Invoice, result as Object))
            .catch((response: Response) => Observable.throw({
                message: 'Unable to delete attachment from invoice',
                response: response
            }));
    }

    public exportSales(salesExportParameters: SalesExportParameters) {
        return `/api/exports/sales?${SearchParams.toHttpParams(
            {
                year: salesExportParameters.year,
                month: salesExportParameters.month
            }).toString()}`;
    }
}
