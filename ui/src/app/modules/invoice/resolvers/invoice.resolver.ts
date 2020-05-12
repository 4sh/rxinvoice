import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {Invoice} from '../../../domain/invoice/invoice';
import {InvoiceService} from '../services/invoice.service';

@Injectable()
export class InvoiceResolver implements Resolve<Invoice> {

    constructor(private invoiceService: InvoiceService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Invoice> {
        const invoiceId = route.paramMap.get('invoiceId');
        if (invoiceId === 'new') {
            return of(new Invoice());
        }
        return this.invoiceService.fetchInvoice(invoiceId)
    }
}
