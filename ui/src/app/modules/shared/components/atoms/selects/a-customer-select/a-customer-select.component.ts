import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {Company} from '../../../../../../domain/company/company';
import {CompanyService} from '../../../../../../common/services/company.service';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AUserSelectComponent} from '../a-user-select/a-user-select.component';
import {User} from '../../../../../../domain/user/user';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ACustomerSelectComponent),
    multi: true
};

@Component({
    selector: 'a-customer-select',
    templateUrl: './a-customer-select.component.html',
    styleUrls: ['./a-customer-select.component.scss'],
    providers: [VALUE_ACCESSOR]
})

export class ACustomerSelectComponent implements OnInit, ControlValueAccessor {

    public companies: Array<Company> = [];
    public company: Company;
    public disabled: boolean;

    private companyRef: string;
    private onNgChange: (companyRef: string) => void;
    private onNgTouched: () => void;

    constructor(private companyService: CompanyService) {
    }

    ngOnInit() {
        this.companyService.fetchCompanies()
            .subscribe(companies => {
                this.companies = companies;
                this.writeValue(this.companyRef);
            });
    }s

    registerOnChange(fn: any): void {
        this.onNgChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onNgTouched = fn;
    }

    writeValue(companyRef: string): void {
        this.companyRef = companyRef;
        if (companyRef) {
            this.company = this.findById(companyRef);
        } else {
            this.company = null;
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onChange(company: Company): void {
        this.company = company;
        this.companyRef = company._id;
        this.onNgChange(company._id);
    }

    private findById(companyRef: string): Company {
        return this.companies.find(company => company._id === companyRef);
    }
}
