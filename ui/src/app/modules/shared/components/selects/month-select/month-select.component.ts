import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MonthItem} from './month-item';
import {TranslateService} from '@ngx-translate/core';


const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MonthSelectComponent),
    multi: true
};

@Component({
    selector: 'month-select',
    templateUrl: './month-select.component.html',
    styleUrls: ['./month-select.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class MonthSelectComponent implements OnInit, ControlValueAccessor {

    private monthsList: Array<MonthItem> = [];
    private onNgChange: (month: number) => void;
    private onNgTouched: () => void;
    private month: number;

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
