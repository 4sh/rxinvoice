import {Pipe} from '@angular/core';
import {CurrencyPipe} from '@angular/common';

@Pipe({
    name: 'invoiceCurrency',
    pure: false
})
export class InvoiceCurrencyPipe extends CurrencyPipe {

    transform(value: any) {
        return super.transform(value, 'EUR', 'symbol', '1.2-2', 'fr');
    }
}
