import {Component, OnInit} from '@angular/core';
import {SellerSettings} from '../../../../domain/company/seller-settings';
import {AuthenticationService} from '../../../../common/services/authentication.service';
import {ServiceKind, ServiceKindEnum} from '../../../../domain/common/service.kind';
import {AccountantVatRate} from '../../../../domain/common/vat-rate';
import {ServiceReference} from '../../../../domain/company/service-reference';
import {SweetAlertService} from '../../../shared/services/sweetAlert.service';
import {SellerSettingsService} from '../../services/seller-settings.service';

@Component({
    selector: 'seller-settings',
    templateUrl: './seller-settings.component.html',
    styleUrls: ['./seller-settings.component.scss']
})
export class SellerSettingsComponent implements OnInit {

    public sellerSettingsModel: SellerSettings;

    public selectedServiceKind: ServiceKind;

    constructor(private authService: AuthenticationService,
                private sellerSettingsService: SellerSettingsService,
                private alertService: SweetAlertService) {
    }

    ngOnInit() {
        this.authService.companyEvents
            .filter(company => !!company)
            .subscribe(company => {
                this.sellerSettingsModel = company.sellerSettings;
            });
        this.selectServiceKind(ServiceKindEnum.SUBCONTRACTING);
    }

    public getServiceReferences(serviceKind: ServiceKind): Array<ServiceReference> {
        return this.sellerSettingsModel.serviceReferenceList.filter(value => value.kind === serviceKind);
    }

    public selectServiceKind(serviceKind: ServiceKind) {
        this.selectedServiceKind = serviceKind;
    }

    public addVatRate(): void {
        this.sellerSettingsModel.vatRates.push(new AccountantVatRate());
    }

    public deleteVatRate(index: number): void {
        this.sellerSettingsModel.vatRates.splice(index, 1);
    }

    public vatRateChanged(rate: AccountantVatRate, service: ServiceReference): void {
        service.vatRate = rate;
    }

    public addServiceReference(serviceKind: ServiceKind): void {
        let serviceReferenceModel = new ServiceReference();
        serviceReferenceModel.kind = serviceKind;
        serviceReferenceModel.vatRate = new AccountantVatRate();
        this.sellerSettingsModel.serviceReferenceList.push(serviceReferenceModel);
    }

    public deleteServiceReference(serviceReference: ServiceReference): void {
        this.sellerSettingsModel.serviceReferenceList.splice(this.sellerSettingsModel.serviceReferenceList.indexOf(serviceReference), 1);
    }

    public save(): void {
        this.sellerSettingsService
            .saveSellerSettings(this.authService.getCurrentCompany()._id, this.sellerSettingsModel)
            .subscribe(result => {
                this.alertService.success({title: 'alert.update.success', customClass: 'swal2-for-edit'});
            });
    }

    public cancel(): void {
       this.sellerSettingsService.fetchSellerSettings(this.authService.getCurrentCompany()._id)
           .subscribe(sellerSettings => this.sellerSettingsModel = sellerSettings);
    }

}
