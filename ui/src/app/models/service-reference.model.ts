import {ServiceKind} from './service.kind';
import {AccountantVatRateModel, VatRateModel} from './vat-rate.model';

export class ServiceReferenceModel {

    kind: ServiceKind;
    vatRate?: AccountantVatRateModel;
    accountNumber: string;
}       