import {Company} from '../company/company';
import {VAT} from '../common/VAT';
import {Business} from '../commercial-relationship/business';
import {InvoiceStatusEnum, InvoiceStatusType} from './invoice-status.type';
import {Activity} from '../common/activity';
import {ServiceKind} from '../common/service.kind';
import {InvoiceLine} from './invoice-line';
import {StatusChange} from './status-change';
import {Blob} from '../blob';
import {DatePipe} from '@angular/common';
import * as _ from 'lodash';
import {VatRate} from '../common/vat-rate';
import {Type} from 'class-transformer';
import 'reflect-metadata';

export class Invoice {
    key: string;
    _id: string;
    reference: string;
    date: Date;
    dueDate: Date;
    sentDate: Date;
    status: InvoiceStatusType;
    withVAT: Boolean = true;
    object: string;
    comment: string;
    customerInvoiceRef: string;
    kind: ServiceKind;
    seller: Company;
    buyer: Company;
    grossAmount: number;
    netAmount: number;
    vats: VatRate[];
    vatsAmount: VAT[];
    business: Business;
    @Type(() => InvoiceLine)
    lines: InvoiceLine[];
    activities: Activity[];
    attachments: Blob[];
    statusChanges: StatusChange[];
    /**
     * Transient property
     */
    vatAmount: number;
    constructor() {
    }

    public copy(): Invoice {
        const copy = _.cloneDeep(this);
        copy.status = InvoiceStatusEnum.DRAFT;
        copy._id = null;
        copy.reference = null;
        copy.sentDate = null;
        copy.activities = [];
        copy.attachments = [];
        copy.statusChanges = [];
        return copy;
    }

    public computeGrossAmount(): number {
        return this.lines
            .map(line => line.grossAmount)
            .reduce((invoiceGrossAmount, lineGrossAmount) => invoiceGrossAmount += lineGrossAmount, 0)
    }

    public computeVatAmount(): number {
        if (!this.withVAT) {
            return 0;
        }
        return this.lines
            .map(line => {
                if (line.vatRate && line.vatRate && line.grossAmount) {
                    return line.vatRate.rate / 100 * line.grossAmount
                }
                return 0;
            })
            .reduce((invoiceVatAmount, lineVatAmount) => invoiceVatAmount += lineVatAmount, 0)
    }

    public computeNetAmount(): number {
        if (!this.withVAT) {
            return this.computeGrossAmount();
        }
        return this.lines
            .map(line => {
                if (line.vatRate && line.vatRate && line.grossAmount) {
                    return (1 + line.vatRate.rate / 100) * line.grossAmount
                }
                return 0;
            })
            .reduce((invoiceTotalAmount, lineAmount) => invoiceTotalAmount += lineAmount, 0)
    }

    generatePdfFilename(invoice) {
        let filename = '';
        if (invoice) {
            if (invoice.reference) {
                filename = invoice.reference;
            }
            if (invoice.business && invoice.business.name) {
                if (filename) {
                    filename += '_';
                }
                filename += invoice.business.name;
            }
            if (invoice.date) {
                if (filename) {
                    filename += '_';
                }
                filename += (new DatePipe('fr')).transform(invoice.date, 'MMMM yyyy');
            }
        }
        if (!filename) {
            filename = 'print_invoice';
        }
        return filename + '.pdf';
    }

    public removeLine(line: InvoiceLine): void {
        this.lines.splice(this.lines.indexOf(line), 1);

    }
}

