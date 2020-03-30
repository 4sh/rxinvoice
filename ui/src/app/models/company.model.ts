import {CompanyKindType} from './company-kind.type';
import {VATModel} from './VAT.model';
import {FiscalYearModel} from './fiscalYear.model';
import {InvoiceInfoModel} from './InvoiceInfo.model';
import {AddressModel} from "./address.model";
import {InvoiceMetricsModel} from "./invoice-metrics";
import {Customer} from './customer.model';

export class CompanyModel {
    _id: string;
    name: string;
    siren: string;
    detail?: string;

    legalNotice?: string;
    showLegalNoticeForeignBuyer?: boolean;
    address: AddressModel;
    metrics?: InvoiceMetricsModel;
    fiscalYearMetricsMap: any;
    customers: Array<Customer>;
    vats?: VATModel[];
    kind?: CompanyKindType;
    fiscalYear?: FiscalYearModel;
    creationDate?: Date;
    emailAddress: string;
    lastSendDate?: Date;
    lastPaymentDate?: Date;
    lastSentInvoice?: InvoiceInfoModel;
    lastPaidInvoice?: InvoiceInfoModel;

    constructor() {
    }
}
