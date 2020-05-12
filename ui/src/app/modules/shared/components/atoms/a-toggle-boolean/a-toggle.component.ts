import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AToggleComponent),
    multi: true
};

@Component({
    selector: 'a-toggle',
    templateUrl: './a-toggle.component.html',
    styleUrls: ['./a-toggle.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class AToggleComponent implements ControlValueAccessor {

    @Input() showLabel = true;
    @Input() label: String;
    @Input() disabled = false;

    public value: Boolean;

    private onNgChange: (value: boolean) => void;
    private onNgTouched: () => void;

    constructor() {
    }

    registerOnChange(fn: any): void {
        this.onNgChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onNgTouched = fn;
    }

    writeValue(value: boolean): void {
        this.value = value;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onChange(value: boolean): void {
        this.value = value;
        this.onNgChange(value);
    }
}
