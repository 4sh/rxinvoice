import {Component, OnInit} from '@angular/core';
import {SellerSettingsModel} from '../../models/seller-settings.model';
import {AuthenticationService} from '../../common/services/authentication.service';
import {ServiceKind} from '../../models/service.kind';

@Component({
    selector: 'seller-settings',
    templateUrl: './seller-settings.component.html',
    styleUrls: ['./seller-settings.component.scss']
})
export class SellerSettingsComponent implements OnInit {

    public sellerSettingsModel: SellerSettingsModel;


    serviceKinds: Array<ServiceKind> = ['SUBCONTRACTING', 'FEE', 'SERVICE', 'BUY_SELL', 'TRAINING', 'HOSTING'];
    selectedServiceKind: ServiceKind;

    constructor(private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.authService.companyEvents
            .filter(company => !!company)
            .subscribe(company => {
                this.sellerSettingsModel = company.sellerSettings;
                this.sellerSettingsModel.vatRates =  [{
                    "label" : "Taux normal 20 %",
                    "rate" : 20,
                    "accountNumber":"445711"
                },{
                    "label" : "Taux normal 8,5 %",
                    "rate" : 8.5,
                    "accountNumber":"445712"
                }]
            });
    }


    getServiceReferences(serviceKind: ServiceKind) {
        return this.sellerSettingsModel.serviceReferenceList.filter(value => value.kind === serviceKind);
    }

    selectServiceKind(serviceKind: ServiceKind) {
        this.selectedServiceKind = serviceKind;
    }
}
