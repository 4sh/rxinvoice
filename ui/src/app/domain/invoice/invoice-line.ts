import {Injectable} from '@angular/core';
import {VatRate} from '../common/vat-rate';

@Injectable()
export class InvoiceLine {
    description: string;
    quantity?: number;
    unitCost?: number;
    grossAmount?: number;
    vatRate?: VatRate;

    /**
     * Transient property.
     */
    editable: boolean;

    constructor(line?: InvoiceLine) {
        if (line) {
            this.description = line.description;
            this.quantity = line.quantity;
            this.unitCost = line.unitCost;
            this.grossAmount = line.grossAmount;
            this.vatRate = line.vatRate;
            this.editable = false;
        }
    }

    public computeGrossAmount(): number {
        if (this.quantity && this.unitCost) {
            return this.quantity * this.unitCost;
        }
        return 0;
    }
}


