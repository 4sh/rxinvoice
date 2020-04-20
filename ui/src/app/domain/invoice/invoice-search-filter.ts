import {InvoiceStatusType} from './invoice-status.type';
import {ServiceKind} from '../common/service.kind';

export class InvoiceSearchFilter {

    query: string;
    startDate: Date;
    endDate: Date;
    buyerRef: string;
    statuses: InvoiceStatusType[];
    kind: ServiceKind;

}