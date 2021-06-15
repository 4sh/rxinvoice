import {InvoiceStatusType} from './invoice-status.type';
import {ServiceKind} from '../common/service.kind';

export class InvoiceSearchFilter {

    query: string;
    startDate: Date;
    endDate: Date;
    customerRef: string;
    statuses: InvoiceStatusType[];
    kind: ServiceKind;
    section: 'vendors' | 'customers'

}