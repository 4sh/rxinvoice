import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {Address} from '../../../domain/company/address';

@Component({
    selector: 'address-input',
    templateUrl: './address-input.component.html',
    styleUrls: ['./address-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AddressInputComponent),
            multi: true
        }

    ]
})
export class AddressInputComponent implements ControlValueAccessor {

    @Input() editMode: boolean;

    public address: Address = new Address();
    public disabled: boolean;

    private onNgChange: (address: Address) => void;
    private onNgTouched: () => void;

    constructor() {
    }

    registerOnChange(fn: any): void {
        this.onNgChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onNgTouched = fn;
    }

    writeValue(address: Address): void {
        if (!address) {
            this.address = new Address()
        } else {
            this.address = address;
        }
    }

}
