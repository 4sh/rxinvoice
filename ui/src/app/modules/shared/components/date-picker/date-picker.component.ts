import {AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as moment from 'moment';
import {DatePickerComponent} from 'ng2-date-picker';
const DATE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InDatePickerComponent),
    multi: true
};
@Component({
    selector: 'date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    providers: [DATE_PICKER_VALUE_ACCESSOR]
})
export class InDatePickerComponent implements AfterViewInit, ControlValueAccessor {
    @Input() dateFormat?: string;
    @Input() datePickerFormGroup: FormGroup;
    @Input() datePickerFormControlName: string;
    @Input() tabindex?: string;
    @ViewChild('picker')
    datePicker: DatePickerComponent;
    @ViewChild('dateInput')
    dateInput: ElementRef;
    dateMoment: moment.Moment;
    date: Date;
    disabled = false;
    config = {format: 'DD/MM/YYYY', locale: 'fr'};
    private initiated = false;
    private firstChange = true;
    ngAfterViewInit(): void {
        this.initiated = true;
    }
    writeValue(obj: any): void {
        this.date = obj;
        if (obj) {
            this.dateMoment = moment(obj);
        } else {
            this.dateMoment = null;
            if (this.datePicker) {
                // otherwise value stay in input
                //this.datePicker.writeValue(undefined);
            }
            if (this.dateInput) {
                this.dateInput.nativeElement.value = undefined;
            }
        }
    }
    onChange = (_: any) => {
    };
    onTouched = () => {
    };
    registerOnChange(fn: (value: any) => any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }
    dateChange(date: any) {
        if (this.initiated) {
            // to keep pristine state
            if (!this.firstChange || this.isMobileDevice()) {
                if (date) {
                    if (this.isMobileDevice()) {
                        this.onChange(moment(date, 'YYYY-MM-DD').toDate());
                    } else if (moment.isMoment(date)) {
                        this.onChange(date.toDate());
                    } else {
                        this.onChange(date);
                    }
                } else {
                    this.onChange(undefined);
                }
            }
            this.firstChange = false;
        }
    }
    public isMobileDevice() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
            || navigator.userAgent.match(/Android/i);
    }
    setDisabledState(isDisabled: boolean): void {
        if (this.datePicker) {
            this.datePicker.setDisabledState(isDisabled);
        }
        this.disabled = isDisabled;
    }
    clear() {
        this.writeValue(null);
        this.dateChange(null);
    }

}
