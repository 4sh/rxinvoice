import {InvoiceStatusType} from './invoice-status.type';
import {ServiceKind} from './service.kind';

export class InvoiceSearchFilterModel {

    query: string;
    startDate: Date;
    endDate: Date;
    buyerRef: string;
    statuses: InvoiceStatusType[];
    kind: ServiceKind;

}