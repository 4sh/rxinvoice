import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {INVOICE_STATUS_LIST, InvoiceStatusType} from '../../../../../../domain/invoice/invoice-status.type';
import {EnumOption} from '../enum-option';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {TranslateService} from '@ngx-translate/core';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AInvoiceStatusSelectComponent),
    multi: true
};

@Component({
    selector: 'a-invoice-status-select',
    templateUrl: './a-invoice-status-select.component.html',
    styleUrls: ['./a-invoice-status-select.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class AInvoiceStatusSelectComponent implements OnInit, ControlValueAccessor {


    public invoiceStatusList: Array<InvoiceStatusType>;
    public invoiceStatus: InvoiceStatusType;
    public items: Array<EnumOption>;

    private onNgChange: (invoiceStatus: InvoiceStatusType) => void;
    private onNgTouched: () => void;
    private selectedItem: EnumOption;

    constructor(private translateService: TranslateService) {
    }

    ngOnInit() {
        this.invoiceStatusList = INVOICE_STATUS_LIST;
        this.createSelectableItems(this.invoiceStatusList).subscribe(items => {
            this.items = items;
            if (this.invoiceStatus) {
                this.selectedItem = this.items.find(item => item.value === this.invoiceStatus);
            }
        });
    }

    private createSelectableItem(enumItem: string): Observable<EnumOption> {
        const labelKey = 'invoice.status.' + enumItem;
        return this.translateService
            .get(labelKey)
            .pipe(map(translated => {
                return {value: enumItem, label: translated};
            }));
    }

    private createSelectableItems(enumItems: string[]): Observable<EnumOption[]> {
        const values: Observable<EnumOption>[] = enumItems.map(enumItem => this.createSelectableItem(enumItem));
        return forkJoin(values);
    }

    registerOnChange(fn: any): void {
        this.onNgChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onNgTouched = fn;
    }

    writeValue(invoiceStatus: InvoiceStatusType): void {
        this.invoiceStatus = invoiceStatus;
        if (this.items) {
            this.selectedItem = this.items.find(item => item.value === invoiceStatus);
        }
    }

    onChange(enumOption: EnumOption) {
        this.invoiceStatus = enumOption.value as InvoiceStatusType;
        this.selectedItem = enumOption;
        this.onNgChange(this.invoiceStatus);
    }
}
