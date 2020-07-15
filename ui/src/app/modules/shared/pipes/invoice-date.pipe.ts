import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
    name: 'invoiceDate'
})
export class InvoiceDatePipe extends DatePipe implements PipeTransform {

    public transform(value: any, ...args: any[]): any {
        return super.transform(value, 'dd/MM/yyyy');
    }
}
