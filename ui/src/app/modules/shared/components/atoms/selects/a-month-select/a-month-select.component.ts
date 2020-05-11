import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MonthItem} from './month-item';
import {TranslateService} from '@ngx-translate/core';


const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AMonthSelectComponent),
    multi: true
};

@Component({
    selector: 'a-month-select',
    templateUrl: './a-month-select.component.html',
    styleUrls: ['./a-month-select.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class AMonthSelectComponent implements OnInit, ControlValueAccessor {

    public month: number;
    public monthsList: Array<MonthItem> = [];
    private onNgChange: (month: number) => void;
    private onNgTouched: () => void;

    constructor(private translateService: TranslateService) {
    }

    ngOnInit() {
        for (let i = 1; i <= 12; i++) {
            this.monthsList.push(new MonthItem(i, this.translateService.instant(`month.${i}`)));
        }
        this.onChange(new Date().getMonth())
    }

    registerOnChange(fn: any): void {
        this.onNgChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onNgTouched = fn;
    }

    writeValue(month: number): void {
        this.month = month;
    }

    onChange(month: number) {
        this.month = month;
        this.writeValue(month);
    }

}
