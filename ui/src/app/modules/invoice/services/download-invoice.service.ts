import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

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

        window.location.href = url + url2;
    }

}
