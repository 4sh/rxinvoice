import {CompanyModel} from './company.model';
import {VATModel} from './VAT.model';
import {BusinessModel} from './business.model';
import {InvoiceStatusType} from './invoice-status.type';
import {ActivityModel} from './activity.model';
import {ServiceKind} from './service.kind';
import {InvoiceLineModel} from './invoice-line.model';
import {StatusChangeModel} from './status-change.model';
import {BlobModel} from './blob.model';
import {DatePipe} from '@angular/common';
import * as _ from 'lodash';
import {VatRateModel} from './vat-rate.model';

export class InvoiceModel {
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
    seller: CompanyModel;
    buyer: CompanyModel;
    grossAmount: number;
    netAmount: number;
    vats: VatRateModel[];
    vatsAmount: VATModel[];
    business: BusinessModel;
    lines: InvoiceLineModel[];
    activities: ActivityModel[];
    attachments: BlobModel[];
    statusChanges: StatusChangeModel[];

    constructor() {
    }

    public copy(): InvoiceModel {
        var copy = _.cloneDeep(this);
        copy.status = "DRAFT";
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

