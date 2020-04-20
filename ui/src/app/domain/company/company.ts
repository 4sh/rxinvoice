import {CompanyKindType} from './company-kind.type';
import {FiscalYear} from './fiscal-year';
import {Address} from "./address";
import {CommercialRelationship} from '../commercial-relationship/commercial-relationship';
import {SellerSettings} from './seller-settings';

export class Company {

    _id: string;
    name: string;
    fullName: string;
    siren: string;
    address: Address;
    kind?: CompanyKindType;
    fiscalYear?: FiscalYear;
    creationDate?: Date;
    emailAddress: string;
    sellerSettings: SellerSettings;
    commercialRelationship?: CommercialRelationship;

    constructor() {
    }
}
