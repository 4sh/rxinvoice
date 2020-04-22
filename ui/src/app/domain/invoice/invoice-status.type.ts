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

export const InvoiceStatusesWorkflow = {

    'DRAFT': {
        rank: 1,
        quickActionEnabled: true,
        authorizedTargets: [InvoiceStatusEnum.READY],
        authorizedSources: []
    },
    'READY': {
        rank: 2,
        quickActionEnabled: false,
        authorizedTargets: [InvoiceStatusEnum.WAITING_VALIDATION],
        authorizedSources: [InvoiceStatusEnum.DRAFT]
    },
    'WAITING_VALIDATION': {
        rank: 3,
        quickActionEnabled: false,
        authorizedTargets: [InvoiceStatusEnum.READY, InvoiceStatusEnum.VALIDATED, InvoiceStatusEnum.CANCELLED],
        authorizedSources: [InvoiceStatusEnum.READY]
    },
    'VALIDATED': {
        rank: 4,
        quickActionEnabled: false,
        authorizedTargets: [InvoiceStatusEnum.SENT, InvoiceStatusEnum.CANCELLED],
        authorizedSources: [InvoiceStatusEnum.WAITING_VALIDATION]
    },
    'SENT': {
        rank: 5,
        quickActionEnabled: true,
        authorizedTargets: [InvoiceStatusEnum.PAID, InvoiceStatusEnum.CANCELLED],
        authorizedSources: [InvoiceStatusEnum.VALIDATED]
    },
    'PAID': {
        rank: 6,
        quickActionEnabled: false,
        authorizedTargets: [InvoiceStatusEnum.LATE, InvoiceStatusEnum.CANCELLED],
        authorizedSources: [InvoiceStatusEnum.SENT]
    },
    'LATE': {
        rank: 7,
        quickActionEnabled: false,
        authorizedTargets: [InvoiceStatusEnum.UNPAID, InvoiceStatusEnum.PAYMENT_SCHEDULED, InvoiceStatusEnum.CANCELLED],
        authorizedSources: [InvoiceStatusEnum.SENT]
    },
    'UNPAID': {
        rank: 8,
        quickActionEnabled: false,
        authorizedTargets: [],
        authorizedSources: [InvoiceStatusEnum.LATE]

    },
    'PAYMENT_SCHEDULED': {
        rank: 8,
        quickActionEnabled: false,
        authorizedTargets: [],
        authorizedSources: [InvoiceStatusEnum.LATE]
    }
};
