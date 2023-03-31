import {InvoiceStatusType} from './invoice-status.type';
import {ServiceKind} from '../common/service.kind';
import {Company} from "../company/company";

export class InvoiceSearchFilter {

    query: string;
    startDate: Date;
    endDate: Date;
    buyerRef: Company;
    statuses: InvoiceStatusType[];
    kind: ServiceKind;
    sortParam: string;
}