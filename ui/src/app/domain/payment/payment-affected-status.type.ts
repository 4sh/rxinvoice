export type PaymentAffectedStatusType =
    'NOT_AFFECTED'
    | 'PARTLY_AFFECTED'
    | 'AFFECTED';

export enum PaymentAffectedStatusEnum {
    NOT_AFFECTED = 'NOT_AFFECTED',
    PARTLY_AFFECTED = 'PARTLY_AFFECTED',
    AFFECTED = 'AFFECTED'
}

export const PAYMENT_AFFECTED_STATUS_LIST: Array<PaymentAffectedStatusType> = [
    PaymentAffectedStatusEnum.NOT_AFFECTED,
    PaymentAffectedStatusEnum.PARTLY_AFFECTED,
    PaymentAffectedStatusEnum.AFFECTED,
];