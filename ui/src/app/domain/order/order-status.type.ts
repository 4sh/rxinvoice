export type OrderStatusType =
    'NOT_PAID'
    | 'PARTLY_PAID'
    | 'PAID';

export enum OrderStatusEnum {
    NOT_PAID = 'NOT_PAID',
    PARTLY_PAID = 'PARTLY_PAID',
    PAID = 'PAID'
}

export const ORDER_STATUS_LIST: Array<OrderStatusType> = [
    OrderStatusEnum.NOT_PAID,
    OrderStatusEnum.PARTLY_PAID,
    OrderStatusEnum.PAID,
];