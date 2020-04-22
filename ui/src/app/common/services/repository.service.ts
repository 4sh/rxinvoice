import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {InvoiceStatusType} from '../../domain/invoice/invoice-status.type';
import {ServiceKind} from '../../domain/common/service.kind';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

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
            .get<InvoiceStatusType[]>(this.baseUrlStatus)
            .pipe(catchError((response: Response) => observableThrowError({ message: 'Unable to fetch statuses', response: response })));
    }

    public fetchInvoiceKind(): ServiceKind[] {
        return this.kinds;
    }

}
