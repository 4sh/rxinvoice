import {Injectable} from '@angular/core';
import {DashboardColumnObserver} from '../components/dashboard-column/dashboard-column-observer';
import {InvoiceStatusType} from '../../../domain/invoice/invoice-status.type';

@Injectable()
export class DashboardEventBusService {

    private observers: Array<DashboardColumnObserver> = [];

    constructor() {
    }

    public register(column: DashboardColumnObserver): void {
        this.observers.push(column);
    }

    public publish(invoiceStatus: InvoiceStatusType) {
        this.observers
            .filter(observer => observer.getInvoiceStatusType() === invoiceStatus)
            .forEach(observer => observer.getCallback().call(observer))
    }
}

