export type PaymentModeType =
    'WIRE_TRANSFER'
    | 'CREDIT_CARD'
    | 'CHECK';

export enum PaymentModeEnum {
    WIRE_TRANSFER = 'WIRE_TRANSFER',
    CREDIT_CARD = 'CREDIT_CARD',
    CHECK = 'CHECK'
}

export const PAYMENT_MODE_LIST: Array<PaymentModeType> = [
    PaymentModeEnum.WIRE_TRANSFER,
    PaymentModeEnum.CREDIT_CARD,
    PaymentModeEnum.CHECK,
];