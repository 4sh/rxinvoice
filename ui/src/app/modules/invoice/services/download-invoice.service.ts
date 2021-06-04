import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";

@Injectable()
export class DownloadInvoiceService {

    private baseUrl = '/api/v1/print';

    constructor(private http: HttpClient) {
    }

    openInvoicePdfAsTab(invoice) {
        const url = this.baseUrl + '?invoiceId=' + invoice._id;
        const url2 = '&filename=' + invoice.generatePdfFilename(invoice);
        window.open(url + url2, '_blank');
    }

    downloadInvoice(invoice) {
        const url = this.baseUrl + '?invoiceId=' + invoice._id;
        const url2 = '&filename=' + invoice.generatePdfFilename(invoice);

        this.http.get(url + url2, {responseType: "arraybuffer", observe: "response"}).pipe(
            tap((response) => {
                let file = new Blob([response.body], {type: 'application/pdf'});
                window.open(URL.createObjectURL(file), '_blank');
            }),
            catchError((response: Response) => throwError({
                message: 'Unable to download pdf',
                response: response
            }))).toPromise()
    }

}
