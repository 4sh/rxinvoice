import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm} from '@angular/forms';
import {Business} from '../../../../domain/commercial-relationship/business';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BusinessLineComponent),
    multi: true
};

@Component({
    selector: 'a-business-line',
    templateUrl: './business-line.component.html',
    styleUrls: ['./business-line.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}],
    providers: [VALUE_ACCESSOR]
})
export class BusinessLineComponent implements OnInit, ControlValueAccessor {

    @ViewChild('businessForm')
    public businessForm: NgForm;

    public business: Business;

    @Input()
    public businessList: Array<Business>;
    @Input()
    public reorderEnabled: boolean;
    @Input()
    public addActionEnabled: boolean;
    @Input()
    public editActionEnabled: boolean;
    @Input()
    public validateActionEnabled: boolean;
    @Input()
    public deleteActionEnabled: boolean;
    @Input()
    public editable: boolean;

    @Output()
    public lineAddedEventEmitter: EventEmitter<void> = new EventEmitter();
    @Output()
    public lineRemovedEventEmitter: EventEmitter<void> = new EventEmitter();

    private onNgChange: (line: Business) => void;
    private onNgTouched: () => void;

    constructor() {
    }

    ngOnInit(): void {
    }

    public editLine(): void {
        this.editable = true;
    }

    public checkLine(): void {
        this.editable = false;
        this.onNgChange(this.business);
    }

    public removeLine(): void {
        this.businessList.splice(this.businessList.indexOf(this.business), 1);
        this.lineRemovedEventEmitter.emit();
    }

    public addLine(): void {
        this.businessList.push(this.business);
        this.lineAddedEventEmitter.emit();
        for (const field in this.businessForm.controls) {
            if (field) {
                this.businessForm.controls[field].markAsUntouched();
            }
        }
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
}
