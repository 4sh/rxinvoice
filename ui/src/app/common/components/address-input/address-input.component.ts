import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {AddressModel} from '../../../models/address.model';

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

    public address: AddressModel = new AddressModel();
    public disabled: boolean;

    private onNgChange: (address: AddressModel) => void;
    private onNgTouched: () => void;

    constructor() {
    }

    registerOnChange(fn: any): void {
        this.onNgChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onNgTouched = fn;
    }

    writeValue(address: AddressModel): void {
        if (!address) {
            this.address = new AddressModel()
        } else {
            this.address = address;
        }
    }

}
