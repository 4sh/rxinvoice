import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {AccountantVatRateModel, VatRateModel} from '../../../../models/vat-rate.model';
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
    public accountantVatRateList: Array<AccountantVatRateModel>;
    @Input()
    public disabled: boolean;

    private selectedVat: AccountantVatRateModel;
    private onNgChange: (vatRate: AccountantVatRateModel) => void;
    private onNgTouched: () => void;

    constructor() {
    }

    registerOnChange(fn: any): void {
        this.onNgChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onNgTouched = fn;
    }

    writeValue(vatRate: AccountantVatRateModel): void {
        if (vatRate && this.accountantVatRateList) {
            const accountantVatRateModel = this.findByRate(vatRate.rate);
            if (accountantVatRateModel) {
                this.selectedVat = accountantVatRateModel
            }
        } else {
            this.selectedVat = null;
        }
    }

    onChange(vatRate: AccountantVatRateModel) {
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

    private findByRate(rate: number): AccountantVatRateModel {
        return this.accountantVatRateList.find(vatModel => rate === vatModel.rate);
    }
}
