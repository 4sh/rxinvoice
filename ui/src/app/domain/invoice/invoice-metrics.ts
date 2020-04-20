export class InvoiceMetricsModel {

    nbInvoices: number;

    invoiced: number;
    paid: number;
    expected: number;
    expired: number;
    cancelled: number;

    constructor() {
    }
}