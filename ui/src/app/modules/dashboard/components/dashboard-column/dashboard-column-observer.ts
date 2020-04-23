import {InvoiceStatusType} from '../../../../domain/invoice/invoice-status.type';

export interface DashboardColumnObserver {

  getInvoiceStatusType(): InvoiceStatusType;

  getCallback(): (() => void);
}
