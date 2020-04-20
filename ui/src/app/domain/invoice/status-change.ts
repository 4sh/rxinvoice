import { Injectable } from '@angular/core';
import {UserInfo} from '../user/user-info';
import {InvoiceStatusType} from './invoice-status.type';

@Injectable()
export class StatusChange {
    from: InvoiceStatusType;
    to: InvoiceStatusType;
    by: UserInfo;
    comment: string;
    timestamp: Date;

  constructor() { }

}


