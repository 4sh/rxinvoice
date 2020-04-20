export type ServiceKind = 'SUBCONTRACTING' | 'FEE' | 'SERVICE' | 'BUY_SELL' | 'TRAINING' | 'HOSTING';

export const SERVICE_KINDS: Array<ServiceKind> = ['SUBCONTRACTING', 'FEE', 'SERVICE', 'BUY_SELL', 'TRAINING', 'HOSTING'];

export enum ServiceKindEnum {
    SUBCONTRACTING = 'SUBCONTRACTING',
    FEE = 'FEE',
    SERVICE = 'SERVICE',
    BUY_SELL = 'BUY_SELL',
    TRAINING = 'TRAINING',
    HOSTING = 'HOSTING',
}