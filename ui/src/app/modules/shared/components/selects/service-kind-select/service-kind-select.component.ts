import {Component, forwardRef, OnInit} from '@angular/core';
import {SERVICE_KINDS, ServiceKind} from '../../../../../domain/common/service.kind';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';
import {forkJoin} from 'rxjs/observable/forkJoin';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ServiceKindSelectComponent),
    multi: true
};

@Component({
    selector: 'service-kind-select',
    templateUrl: './service-kind-select.component.html',
    styleUrls: ['./service-kind-select.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class ServiceKindSelectComponent implements OnInit, ControlValueAccessor {

    public serviceKindList: Array<ServiceKind>;
    public serviceKind: ServiceKind;
    private onNgChange: (serviceKind: ServiceKind) => void;
    private onNgTouched: () => void;
    private items: Array<EnumOption>;
    private selectedItem: EnumOption;

    constructor(private translateService: TranslateService) {
    }

    ngOnInit() {
        this.serviceKindList = SERVICE_KINDS;
        this.createSelectableItems(this.serviceKindList).subscribe(items => {
            this.items = items;
            if (this.serviceKind) {
                this.selectedItem = this.items.find(item => item.value === this.serviceKind);
            }
        });
    }

    private createSelectableItem(enumItem: string): Observable<EnumOption> {
        const labelKey = 'service.kind.' + enumItem;
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
        this.onNgTouched = fn
    }

    writeValue(serviceKind: ServiceKind): void {
        this.serviceKind = serviceKind;
        if (this.items) {
            this.selectedItem = this.items.find(item => item.value === serviceKind);
        }
    }

    onChange(enumOption: EnumOption) {
        this.serviceKind = enumOption.value as ServiceKind;
        this.selectedItem = enumOption;
        this.onNgChange(this.serviceKind);
    }
}

class EnumOption {
    value: string;
    label: string;
}