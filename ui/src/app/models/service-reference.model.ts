import {ServiceKind} from './service.kind';
import {VatRateModel} from './vat-rate.model';

export class ServiceReferenceModel {

    kind: ServiceKind;
    vatRate?: VatRateModel;
    accountNumber: string;
}       