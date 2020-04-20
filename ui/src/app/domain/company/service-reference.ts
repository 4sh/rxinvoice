import {ServiceKind} from '../common/service.kind';
import {AccountantVatRate} from '../common/vat-rate';

export class ServiceReference {

    kind: ServiceKind;
    vatRate?: AccountantVatRate;
    accountNumber: string;
}       