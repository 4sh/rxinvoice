import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {VatRate} from '../../../../../../domain/common/vat-rate';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AVatSelectComponent),
    multi: true
};

@Component({
    selector: 'a-vat-select',
    templateUrl: './a-vat-select.component.html',
    styleUrls: ['./a-vat-select.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class AVatSelectComponent implements ControlValueAccessor {

    @Input()
    public vatRateList: Array<VatRate>;
    @Input()
    public disabled: boolean;

    public selectedVat: VatRate;
    private onNgChange: (vatRate: VatRate) => void;
    private onNgTouched: () => void;

    constructor() {
    }

    registerOnChange(fn: any): void {
        this.onNgChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onNgTouched = fn;
    }

    writeValue(vatRate: VatRate): void {
        this.selectedVat = vatRate
    }

    onChange(vatRate: VatRate) {
        this.selectedVat = vatRate;
        this.onNgChange(this.selectedVat);
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}







