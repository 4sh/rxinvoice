import {CompanyKindType} from './company-kind.type';
import {FiscalYearModel} from './fiscal-year.model';
import {AddressModel} from "./address.model";
import {CommercialRelationshipModel} from './commercial-relationship.model';

export class CompanyModel {

    _id: string;
    name: string;
    fullName: string;
    siren: string;
    address: AddressModel;
    kind?: CompanyKindType;
    fiscalYear?: FiscalYearModel;
    creationDate?: Date;
    emailAddress: string;
    commercialRelationship?: CommercialRelationshipModel;

    constructor() {
    }
}
