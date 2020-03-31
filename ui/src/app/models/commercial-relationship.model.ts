import {InvoiceInfoModel} from './InvoiceInfo.model';
import {User} from './user.model';
import {VatRateModel} from './vat-rate.model';
import {CompanyMetricsModel} from './company-metrics.model';
import {BusinessModel} from './business.model';

export class CommercialRelationshipModel {
    _id: string;
    customerRelationshipManager?: User;
    detail?: string;
    legalNotice?: string;
    showLegalNoticeForeignBuyer?: boolean;
    vatRates: Array<VatRateModel>;
    businessList: Array<BusinessModel>;
    companyMetrics: CompanyMetricsModel;

    lastSendDate?: Date;
    lastPaymentDate?: Date;
    lastSentInvoice?: InvoiceInfoModel;
    lastPaidInvoice?: InvoiceInfoModel;

}