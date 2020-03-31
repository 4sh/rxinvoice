import {InvoiceMetricsModel} from './invoice-metrics';

export class CompanyMetricsModel {

    global: InvoiceMetricsModel;
    previousYear: InvoiceMetricsModel;
    currentYear: InvoiceMetricsModel;
    nextYear: InvoiceMetricsModel;
}