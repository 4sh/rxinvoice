export type PaymentStatusType =
    'PENDING'
    | 'DONE'
    | 'CANCELED'
    | 'ERROR';

export enum PaymentStatusEnum {
    PENDING = 'PENDING',
    DONE = 'DONE',
    CANCELED = 'CANCELED',
    PAID = 'PAID',
    ERROR = 'ERROR'
}

export const PAYMENT_STATUS_LIST: Array<PaymentStatusType> = [
    PaymentStatusEnum.PENDING,
    PaymentStatusEnum.DONE,
    PaymentStatusEnum.CANCELED,
    PaymentStatusEnum.ERROR,
];