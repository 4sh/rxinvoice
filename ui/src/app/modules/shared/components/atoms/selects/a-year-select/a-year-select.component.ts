import {Component, forwardRef, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';


const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AYearSelectComponent),
    multi: true
};

@Component({
    selector: 'a-year-select',
    templateUrl: './a-year-select.component.html',
    styleUrls: ['./a-year-select.component.scss'],
    providers: [VALUE_ACCESSOR]

})
export class AYearSelectComponent implements OnInit {

    public year: number;
    public yearsList: Array<number> = [];
    private onNgChange: (year: number) => void;
    private onNgTouched: () => void;

    constructor() {
    }

    ngOnInit() {
        const currentYear = new Date().getFullYear();
        for (let i = 0; i <= 10; i++) {
            this.yearsList.push(currentYear - i);
        }
        this.writeValue(currentYear);

    }

    registerOnChange(fn: any): void {
        this.onNgChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onNgTouched = fn;
    }

    writeValue(year: number): void {
        this.year = year;
    }

    onChange(year: number) {
        this.year = year;
        this.onNgChange(year);
    }
}
