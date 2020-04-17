import {Injectable} from '@angular/core';
import {VATModel} from './VAT.model';
import {VatRateModel} from './vat-rate.model';

@Injectable()
export class InvoiceLineModel {
    description: string;
    quantity?: number;
    unitCost?: number;
    grossAmount?: number;
    vat?: VatRateModel;

  constructor() { }

}


