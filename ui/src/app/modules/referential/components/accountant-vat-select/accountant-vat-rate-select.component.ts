import {Component, forwardRef, Input} from '@angular/core';
import {AccountantVatRate} from '../../../../domain/common/vat-rate';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AccountantVatRateSelectComponent),
    multi: true
};

@Component({
    selector: 'accountant-vat-select',
    templateUrl: './accountant-vat-rate-select.component.html',
    styleUrls: ['./accountant-vat-rate-select.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class AccountantVatRateSelectComponent implements ControlValueAccessor {

    @Input()
    public accountantVatRateList: Array<AccountantVatRate>;
    @Input()
    public disabled: boolean;

    public selectedVat: AccountantVatRate;
    private onNgChange: (vatRate: AccountantVatRate) => void;
    private onNgTouched: () => void;

    constructor() {
    }

    registerOnChange(fn: any): void {
        this.onNgChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onNgTouched = fn;
    }

    writeValue(vatRate: AccountantVatRate): void {
        if (vatRate && this.accountantVatRateList) {
            const accountantVatRateModel = this.findByRate(vatRate.rate);
            if (accountantVatRateModel) {
                this.selectedVat = accountantVatRateModel
            }
        } else {
            this.selectedVat = null;
        }
    }

    onChange(vatRate: AccountantVatRate) {
        if (vatRate && this.accountantVatRateList) {
            const accountantVatRateModel = this.findByRate(vatRate.rate);
            if (accountantVatRateModel) {
                this.selectedVat = accountantVatRateModel
            }
        } else {
            this.selectedVat = null;
        }
        this.onNgChange(this.selectedVat);
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private findByRate(rate: number): AccountantVatRate {
        return this.accountantVatRateList.find(vatModel => rate === vatModel.rate);
    }
}
