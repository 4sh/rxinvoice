export class VatRate {
    rate: number;
    label: string;
}

export class AccountantVatRate extends VatRate {
    accountNumber: string;
}
