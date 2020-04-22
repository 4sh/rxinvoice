import { Injectable } from '@angular/core';
import {DashboardColumnObserver} from '../components/dashboard/dashboard-column-observer';
import {InvoiceStatusType} from '../../domain/invoice/invoice-status.type';

@Injectable()
export class DashboardEventBusService {

  constructor() { }

  private observers: Array<DashboardColumnObserver> = [];

  public register(column: DashboardColumnObserver): void {
    this.observers.push(column);
  }

  public publish(invoiceStatus: InvoiceStatusType) {
    this.observers
        .filter(observer => observer.getInvoiceStatusType() === invoiceStatus)
        .forEach(observer => observer.getCallback().call(observer))
  }
}

