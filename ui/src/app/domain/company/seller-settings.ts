import {ServiceReference} from './service-reference';
import {AccountantVatRate} from '../common/vat-rate';

export class SellerSettings {
    vatRates: Array<AccountantVatRate>;
    serviceReferenceList: Array<ServiceReference>;
}
