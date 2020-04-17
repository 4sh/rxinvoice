export class VatRateModel {
    rate: number;
    label: string;
}

export class AccountantVatRateModel extends VatRateModel {
    accountNumber: string;
}