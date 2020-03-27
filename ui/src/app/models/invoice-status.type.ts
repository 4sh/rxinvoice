export type InvoiceStatusType =
    'DRAFT'
    | 'READY'
    | 'WAITING_VALIDATION'
    | 'VALIDATED'
    | 'SENT'
    | 'PAID'
    | 'PAYMENT_SCHEDULED'
    | 'LATE'
    | 'UNPAID'
    | 'CANCELLED';

export enum InvoiceStatusEnum {
    DRAFT = 'DRAFT',
    READY = 'READY',
    WAITING_VALIDATION = 'WAITING_VALIDATION',
    VALIDATED = 'VALIDATED',
    SENT = 'SENT',
    PAID = 'PAID',
    PAYMENT_SCHEDULED = 'PAYMENT_SCHEDULED',
    LATE = 'LATE',
    UNPAID = 'UNPAID',
    CANCELLED = 'CANCELLED'
}
