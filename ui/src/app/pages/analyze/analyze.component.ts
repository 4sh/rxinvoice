import {Component, OnInit} from '@angular/core';
import {SalesExportParameters} from './sales-export-parameters';
import {InvoiceService} from '../../modules/invoice/services/invoice.service';

@Component({
    selector: 'analyze',
    templateUrl: './analyze.component.html',
    styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {

    public salesExportParameters: SalesExportParameters;

    constructor(private invoiceService: InvoiceService) {
    }

    ngOnInit() {
        this.salesExportParameters = new SalesExportParameters(new Date().getFullYear(), new Date().getMonth());
    }

    public exportSales(): string {
        return this.invoiceService.exportSales(this.salesExportParameters);
    }
}
