import {Component, OnInit, ViewChild} from '@angular/core';
import {Company} from '../../../../domain/company/company';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SweetAlertService} from '../../../shared/services/sweetAlert.service';
import {AuthenticationService} from '../../../../common/services/authentication.service';
import {Location} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {Vendor} from "../../../../domain/company/vendor";
import {VendorService} from "../../services/vendor.service";

@Component({
    selector: 'vendor-detail',
    templateUrl: './vendor-detail.component.html',
    styleUrls: ['./vendor-detail.component.scss']
})
export class VendorDetailComponent implements OnInit {

    public customer: Company;
    public vendor = new Vendor();
    public canDelete: boolean;
    @ViewChild('vendorForm', {static: true}) form: FormGroup;

    public currentTabIndex = 1;

    constructor(private vendorService: VendorService,
                private route: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private alertService: SweetAlertService,
                private authService: AuthenticationService,
                private location: Location) {
    }

    ngOnInit() {

        this.route.data.subscribe(data => {
            this.vendor = data.vendor;
            this.authService.companyEvents
                .subscribe(companyEvent => {
                    this.customer = companyEvent;
                });

            this.authService.userEvents
                .subscribe(currentUser =>
                    this.canDelete = currentUser.roles.filter(role => role === 'admin' || role === 'seller').length > 0
                );
        });
    }

    public save() {
        if (this.vendor._id) {
            this.vendorService.updateVendor(this.vendor).subscribe((vendor) => {
                    this.vendor = vendor;
                    this.alertService.success({title: 'alert.update.success', customClass: 'swal2-for-edit'});
                },
                () => {
                    this.alertService.error({title: 'alert.update.error', customClass: 'swal2-for-edit'});
                });
        } else {
            this.vendorService.createVendor(this.vendor).subscribe((vendor) => {
                    this.vendor = vendor;
                    this.alertService.success({title: 'alert.creation.success', customClass: 'swal2-for-edit'});
                },
                () => {
                    this.alertService.error({title: 'alert.creation.error', customClass: 'swal2-for-edit'});
                });
        }
    }

    public delete() {
        this.alertService.confirm({title: 'alert.confirm.deletion'}).then(
            (result) => {
                if (result.value) {
                    this.vendorService.deleteVendor(this.vendor)
                        .subscribe(() => {
                            this.router.navigate(['vendors']);
                        });
                }
            }
        );
    }

    public goBack() {
        this.location.back();
    }

    public showGeneralInformationTab(): void {
        this.currentTabIndex = 1;
    }

    public showCommercialRelationTab(): void {
        this.currentTabIndex = 2;
    }
}
