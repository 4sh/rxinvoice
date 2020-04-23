import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CompanyService} from "../../../../../common/services/company.service";
import {VatRate} from '../../../../../domain/common/vat-rate';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => VatSelectComponent),
    multi: true
};

@Component({
    selector: 'vat-select',
    templateUrl: './vat-select.component.html',
    styleUrls: ['./vat-select.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class VatSelectComponent implements OnInit, OnChanges, ControlValueAccessor {

    @Input()
    public disabled: boolean;
    @Input()
    public required: boolean;
    @Input()
    public companyRef: string;

    @Output()
    public vatChanged:EventEmitter<VatRate> = new EventEmitter<VatRate>();

    public vatModelList: Array<VatRate> = [];
    public selectedVat: VatRate;
    private companyService: CompanyService;

    constructor(companyService: CompanyService) {
        this.companyService = companyService;
    }

    ngOnInit() {
        this.initializeVatList();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.initializeVatList();
    }

    private initializeVatList() {
        const defaultVAT: VatRate = new VatRate();
        defaultVAT.label = "Taux normal - 20 %";
        defaultVAT.rate = 20;

        if (this.companyRef) {
            this.companyService.fetchCompany(this.companyRef)
                .subscribe(company => {
                    this.vatModelList = company.commercialRelationship.vatRates;
                    if (!this.findByVATRate(defaultVAT.rate)) {
                        this.vatModelList.push(defaultVAT);
                    }
                });
        }
    }

    ngChange(_: any) {
    };

    ngTouched(_: any) {
    };

    registerOnChange(fn: any): void {
        this.ngChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.ngTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(vat: VatRate): void {
        // Add invoice line vat value in selection list in case it has been removed from customer available vat list.
        if (vat && !this.vatModelList
            .map(vatModel => vatModel.rate)
            .find(rate => rate === vat.rate)) {
            this.vatModelList.push(vat);
        }
        if (vat) {
            this.selectedVat = this.findByVATRate(vat.rate);
        }
    }

    onChange(vatModel: VatRate): void {
        this.selectedVat = vatModel;
        this.vatChanged.emit(vatModel);
    }

    private findByVATRate(rate: number): VatRate {
        return this.vatModelList.find(vatModel => rate === vatModel.rate);
    }


}







