import {Injectable} from '@angular/core';
import {VatRate} from '../common/vat-rate';

@Injectable()
export class OrderLine {
    description: string;
    quantity: number;
    unitCost: {
        value: number,
        currency: string
    };
    netAmount: {
        value: number,
        currency: string
    };
    vatRate?: VatRate;
}


