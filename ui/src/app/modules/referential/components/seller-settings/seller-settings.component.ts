import {Component, OnInit} from '@angular/core';
import {SellerSettingsModel} from '../../../../models/seller-settings.model';
import {AuthenticationService} from '../../../../common/services/authentication.service';
import {ServiceKind, ServiceKindEnum} from '../../../../models/service.kind';
import {AccountantVatRateModel} from '../../../../models/vat-rate.model';
import {ServiceReferenceModel} from '../../../../models/service-reference.model';
import {CompanyService} from '../../../../common/services/company.service';
import {SweetAlertService} from '../../../shared/services/sweetAlert.service';
import {SellerSettingsService} from '../../services/seller-settings.service';

@Component({
    selector: 'seller-settings',
    templateUrl: './seller-settings.component.html',
    styleUrls: ['./seller-settings.component.scss']
})
export class SellerSettingsComponent implements OnInit {

    public sellerSettingsModel: SellerSettingsModel;

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

    public getServiceReferences(serviceKind: ServiceKind): Array<ServiceReferenceModel> {
        return this.sellerSettingsModel.serviceReferenceList.filter(value => value.kind === serviceKind);
    }

    public selectServiceKind(serviceKind: ServiceKind) {
        this.selectedServiceKind = serviceKind;
    }

    public addVatRate(): void {
        this.sellerSettingsModel.vatRates.push(new AccountantVatRateModel());
    }

    public deleteVatRate(index: number): void {
        this.sellerSettingsModel.vatRates.splice(index, 1);
    }

    public vatRateChanged(rate: AccountantVatRateModel, service: ServiceReferenceModel): void {
        service.vatRate = rate;
    }

    public addServiceReference(serviceKind: ServiceKind): void {
        let serviceReferenceModel = new ServiceReferenceModel();
        serviceReferenceModel.kind = serviceKind;
        serviceReferenceModel.vatRate = new AccountantVatRateModel();
        this.sellerSettingsModel.serviceReferenceList.push(serviceReferenceModel);
    }

    public deleteServiceReference(serviceReference: ServiceReferenceModel): void {
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
