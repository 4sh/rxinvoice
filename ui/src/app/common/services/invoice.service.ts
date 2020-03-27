import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {plainToClass} from 'class-transformer';
import {HttpClient} from '@angular/common/http';
import {InvoiceModel} from '../../models/invoice.model';
import {SearchParams} from '../../models/search-params.model';
import {InvoiceSearchFilterModel} from '../../models/invoice-search-filter.model';
import {InvoiceStatusEnum, InvoiceStatusType} from '../../models/invoice-status.type';

@Injectable()
export class InvoiceService {

    public invoiceSearchFilter: InvoiceSearchFilterModel;

    private baseUrl = '/api/invoices';

    constructor(private http: HttpClient) {
    }

    public fetchInvoices(params: any, save?: boolean): Observable<InvoiceModel[]> {
        if (save) {
            this.invoiceSearchFilter = new InvoiceSearchFilterModel();
            this.invoiceSearchFilter.startDate = params.startDate;
            this.invoiceSearchFilter.endDate = params.endDate;
            this.invoiceSearchFilter.query = params.query;
            this.invoiceSearchFilter.kind = params.kind;
            this.invoiceSearchFilter.buyerRef = params.buyerRef;
            this.invoiceSearchFilter.statuses = params.statuses;
        }
        return this.http
            .get(this.baseUrl, {params: SearchParams.toHttpParams(params)})
            .map((result: any) => plainToClass(InvoiceModel, result as Object[]))
            .catch((response: Response) => Observable.throw({message: 'Unable to fetch invoices', response: response}));
    }

    public fetchToPrepareInvoices(): Observable<InvoiceModel[]> {
        return this.http
            .get(this.baseUrl + '/toPrepare')
            .map((result: any) => plainToClass(InvoiceModel, result as Object[]))
            .catch((response: Response) => Observable.throw({
                message: 'Unable to fetch to prepare invoices',
                response: response
            }));
    }

    public fetchInvoice(id): Observable<InvoiceModel> {
        return this.http
            .get(this.baseUrl + '/' + id)
            .map((result: any) => plainToClass(InvoiceModel, result as Object))
            .catch((response: Response) => Observable.throw({message: 'Unable to fetch invoice', response: response}));
    }

    public saveInvoice(invoice): Observable<InvoiceModel> {
        return this.http
            .put(`${this.baseUrl}/${invoice._id}`, invoice)
            .map((result: any) => plainToClass(InvoiceModel, result as Object))
            .catch((response: Response) => Observable.throw({message: 'Unable to save invoice', response: response}));
    }

    public createInvoice(invoice): Observable<InvoiceModel> {
        return this.http
            .post(this.baseUrl, invoice)
            .map((result: any) => plainToClass(InvoiceModel, result as Object))
            .catch((response: Response) => Observable.throw({message: 'Unable to create invoice', response: response}));
    }

    public deleteInvoice(invoice): Observable<InvoiceModel> {
        return this.http
            .delete(this.baseUrl + '/' + invoice._id)
            .map((result: any) => plainToClass(InvoiceModel, result as Object))
            .catch((response: Response) => Observable.throw({message: 'Unable to delete invoice', response: response}));
    }

    public deleteAttachment(invoiceId, attachmentId): Observable<InvoiceModel> {
        return this.http
            .delete(this.baseUrl + '/' + invoiceId + '/attachments/' + attachmentId)
            .map((result: any) => plainToClass(InvoiceModel, result as Object))
            .catch((response: Response) => Observable.throw({
                message: 'Unable to delete attachment from invoice',
                response: response
            }));
    }

    public isDraftInvoice(invoiceStatus: InvoiceStatusType) {
        return invoiceStatus &&
            (invoiceStatus === InvoiceStatusEnum.DRAFT
                || invoiceStatus === InvoiceStatusEnum.READY);
    }
}
