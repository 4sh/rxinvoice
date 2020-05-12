import {Injectable} from '@angular/core';
import {VatRate} from '../common/vat-rate';

@Injectable()
export class InvoiceLine {
    description: string;
    quantity?: number;
    unitCost?: number;
    grossAmount?: number;
    vatRate?: VatRate;

  constructor() { }

}


