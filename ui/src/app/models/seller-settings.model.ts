import {ServiceReferenceModel} from './service-reference.model';
import {AccountantVatRateModel} from "./vat-rate.model";

export class SellerSettingsModel {
    vatRates: Array<AccountantVatRateModel>;
    serviceReferenceList: Array<ServiceReferenceModel>;
}
