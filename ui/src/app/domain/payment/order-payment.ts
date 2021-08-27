import 'reflect-metadata';

export class OrderPayment {
    _id: string;
    amount: {
        value: number;
        currency: string;
    };
    paymentRef: string;
    orderRef: String;
}

