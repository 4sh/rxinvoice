import {VatRate} from '../common/vat-rate';
import {CompanyMetrics} from '../company/company-metrics';
import {Business} from './business';

export class CommercialRelationship {
    _id: string;
    customerManagerRef?: string;
    detail?: string;
    legalNotice?: string;
    showLegalNoticeForeignBuyer?: boolean;
    vatRates: Array<VatRate>;
    businessList: Array<Business>;
    companyMetrics: CompanyMetrics;

    lastSendDate?: Date;
    lastPaymentDate?: Date;

    accountantReference: string;
}