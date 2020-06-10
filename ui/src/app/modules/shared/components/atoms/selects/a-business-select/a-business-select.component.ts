import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Business} from '../../../../../../domain/commercial-relationship/business';
import {CustomerService} from '../../../../../customer/services/customer.service';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ABusinessSelectComponent),
    multi: true
};

@Component({
    selector: 'a-business-select',
    templateUrl: './a-business-select.component.html',
    styleUrls: ['./a-business-select.component.sass'],
    providers: [VALUE_ACCESSOR]
})
export class ABusinessSelectComponent implements OnInit, ControlValueAccessor {

    @Input()
    public customerRef: string;
    public business: Business;
    public disabled: boolean;
    public businessList: Array<Business> = [];

    private onNgChange: (business: Business) => void;
    private onNgTouched: () => void;

    constructor(private customerService: CustomerService) {
    }

    ngOnInit(): void {
        this.customerService.fetchCustomer(this.customerRef)
            .subscribe(customer => {
                this.businessList = customer.commercialRelationship.businessList;
                this.writeValue(this.business);
            });
    }

    registerOnChange(fn: any): void {
        this.onNgChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onNgTouched = fn;
    }

    writeValue(business: Business): void {
        this.business = business;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onChange(business: Business): void {
        this.business = business;
        this.onNgChange(business);
    }
}
