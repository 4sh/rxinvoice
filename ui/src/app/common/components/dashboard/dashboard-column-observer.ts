import {InvoiceStatusType} from '../../../models/invoice-status.type';

export interface DashboardColumnObserver {

  getInvoiceStatusType(): InvoiceStatusType;

  getCallback(): (() => void);
}