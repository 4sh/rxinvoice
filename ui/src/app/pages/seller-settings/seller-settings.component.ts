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

    constructor(private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.authService.companyEvents
            .filter(company => !!company)
            .subscribe(company => {
                this.sellerSettingsModel = company.sellerSettings;
            });
    }

    getServiceReferences(serviceKind: ServiceKind) {
        return this.sellerSettingsModel.serviceReferenceList.filter(value => value.kind === serviceKind);
    }
}
