import 'reflect-metadata';
import {PaymentStatusEnum} from "./payment-status.type";
import {PaymentModeEnum} from "./payment-mode";
import {PaymentAffectedStatusEnum} from "./payment-affected-status.type";
import {OrderPayment} from "./order-payment";

export class Payment {
    _id: string;
    date: Date;
    amount: {
        value: number;
        currency: string;
    };
    mode: PaymentModeEnum;
    customerRef: string;
    vendorRef: String;
    status: {
        value: PaymentStatusEnum;
        label?: string;
    };
    affectedStatus: PaymentAffectedStatusEnum;
    providerRef: string;
    orders: OrderPayment[];
    // invoices: InvoicePayment[];
}

