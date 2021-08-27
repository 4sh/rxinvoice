import {ServiceKind} from '../common/service.kind';
import {Type} from 'class-transformer';
import 'reflect-metadata';
import {OrderLine} from "./order-line";
import {OrderStatusEnum} from "./order-status.type";
import {Customer} from "../company/customer";
import {Invoice} from "../invoice/invoice";

export class Order {
    _id: string;
    reference: string;
    date: Date;
    subject: string;
    kind: ServiceKind;
    currency: string;
    @Type(() => OrderLine)
    lines: OrderLine[] = [];
    netAmount: {
        value: number,
        currency: string
    };
    vendorRef: string;
    customer: Customer;
    paymentStatus: OrderStatusEnum;
    providerRef?: string;
    invoice?: Invoice;
}

