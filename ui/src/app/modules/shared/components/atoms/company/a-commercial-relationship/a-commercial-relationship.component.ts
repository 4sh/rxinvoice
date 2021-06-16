import {Component, Input, OnInit} from '@angular/core';
import {Company} from "../../../../../../domain/company/company";
import {Business} from "../../../../../../domain/commercial-relationship/business";
import {VatRate} from "../../../../../../domain/common/vat-rate";

@Component({
    selector: 'a-commercial-relationship',
    templateUrl: './a-commercial-relationship.component.html',
    styleUrls: ['./a-commercial-relationship.component.scss']
})
export class ACommercialRelationshipComponent implements OnInit {

    @Input() company: Company;
    public newBusiness: Business = new Business();
    public newVat: VatRate;
    public availableVatRates: Array<VatRate>;

    constructor() {
    }

    ngOnInit(): void {
    }

    public businessAdded(): void {
        this.newBusiness = new Business();
    }

    public vatAdded(vatRate: VatRate): void {
        this.company.commercialRelationship.vatRates.push(vatRate);
        this.updateAvailableRates();
    }

    private updateAvailableRates() {
        // this.availableVatRates = this.vendor.sellerSettings.vatRates
        //     .filter(value => this.company.commercialRelationship.vatRates.map(vat => vat.rate).indexOf(value.rate) < 0);
        if (this.availableVatRates.length > 0) {
            this.newVat = this.availableVatRates[0];
        } else {
            this.newVat = null;
        }
    }

    public vatDeleted(): void {
        this.updateAvailableRates();
    }

}
