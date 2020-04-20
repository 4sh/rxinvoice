import {Injectable} from '@angular/core';
import {InvoiceStatusType} from '../../domain/invoice/invoice-status.type';
import {ServiceKind} from '../../domain/common/service.kind';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RepositoryService {

    private baseUrlStatus = '/api/invoices/status';

    statuses: InvoiceStatusType[]  = [
        'DRAFT', 'READY', 'SENT', 'LATE', 'PAID', 'CANCELLED',
        'WAITING_VALIDATION', 'VALIDATED'
    ];

    kinds: ServiceKind[] = [
        'SUBCONTRACTING', 'FEE', 'SERVICE', 'BUY_SELL', 'TRAINING', 'HOSTING'
    ];

    constructor(private http: HttpClient) {
    }

    public fetchInvoiceStatus(): Observable<InvoiceStatusType[]> {
        return this.http
            .get(this.baseUrlStatus)
            .catch((response: Response) => Observable.throw({ message: 'Unable to fetch statuses', response: response }));
    }

    public fetchInvoiceKind(): ServiceKind[] {
        return this.kinds;
    }

}
