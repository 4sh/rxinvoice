import {ServiceReferenceModel} from './service-reference.model';
import {VatRateModel} from "./vat-rate.model";

export class SellerSettingsModel {
    vatRates: Array<VatRateModel>
    serviceReferenceList: Array<ServiceReferenceModel>
}
