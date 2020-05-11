import {InvoiceLine} from '../../../../domain/invoice/invoice-line';

export class LineMoveEvent {

    line: InvoiceLine;
    direction: number;


    constructor(line: InvoiceLine, direction: number) {
        this.line = line;
        this.direction = direction;
    }
}
