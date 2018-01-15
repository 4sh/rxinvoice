import {CompanyKindType} from './company-kind.type';
import {BusinessModel} from './business.model';
import {VATModel} from './VAT.model';
import {FiscalYearModel} from './fiscalYear.model';
import {InvoiceInfoModel} from './InvoiceInfo.model';

export class CompanyModel {
    key: string;
    name: string;
    fullName: string;
    detail: string;
    legalNotice: string;
    showLegalNoticeForeignBuyer: boolean;
    address: string;
    metrics: {invoiced: number};
    business: BusinessModel[];
    vats: VATModel[];
    kind: CompanyKindType;
    fiscalYear: FiscalYearModel;
    creationDate: Date;
    emailAddress: string;
    lastSendDate: Date;
    lastPaymentDate: Date;
    lastSentInvoice: InvoiceInfoModel;
    lastPaidInvoice: InvoiceInfoModel;

    revenue: number;
    lastYearRevenue: number;
    lastPaiementDate: Date;

    financialYear: number;
    lastFinancialYear: number;
    furtureFinancialYear: number;

  constructor() {
  }
}
