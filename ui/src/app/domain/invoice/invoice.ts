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

export class Invoice {
    key: string;
    _id: string;
    reference: string;
    date: Date;
    dueDate: Date;
    sentDate: Date;
    status: InvoiceStatusType;
    withVAT: boolean;
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
    lines: InvoiceLine[];
    activities: Activity[];
    attachments: Blob[];
    statusChanges: StatusChange[];

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
}

