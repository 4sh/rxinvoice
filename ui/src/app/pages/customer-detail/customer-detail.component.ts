import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyModel} from '../../models/company.model';
import {FormGroup} from '@angular/forms';
import {CompanyService} from '../../common/services/company.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import * as Moment from 'moment';
import {SweetAlertService} from '../../common/services/sweetAlert.service';
import {AuthenticationService} from '../../common/services/authentication.service';
import 'rxjs/add/operator/filter';
import {Location} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

    public customer = new CompanyModel();
    public editMode = false;
    public companyId: string;
    public canDelete: boolean;
    @ViewChild('f') form: FormGroup;
    private currentYearTurnover: number = 0;
    private currentYearTurnoverExpected: number = 0;
    private totalTurnover: number = 0;
    public companyFiscalYearBounds: string;

    constructor(private companyService: CompanyService,
                private route: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private alertService: SweetAlertService,
                private authService: AuthenticationService,
                private location: Location) {
    }

    ngOnInit() {
        this.fetchCustomer();
        const currentUser = this.authService.current();
        this.companyService.fetchCompany(currentUser.companyRef)
            .subscribe(company => this.buildCompanyFiscalYearBounds(company));


        this.canDelete = currentUser.roles.filter(role => role === 'admin').length > 0;
    }

    private updateForm(obj) {
        return {
            name: obj.name,
            emailAddress: obj.emailAddress,
            address: obj.address,
            legalNotice: obj.legalNotice,
            detail: obj.detail,
        };
    }

    public fetchCustomer() {
        this.route.params.subscribe(params => {
            if (!this.companyId) {
                this.companyId = params['id'];
            }
            if (this.companyId) {
                this.companyService.fetchCompany(this.companyId)
                    .subscribe((company: CompanyModel) => {
                        this.form.setValue(this.updateForm(company));
                        this.customer = company;
                        if (company && company.fiscalYearMetricsMap && company.fiscalYearMetricsMap["currentYear"]) {
                            this.currentYearTurnover = company.fiscalYearMetricsMap["currentYear"].invoiced +
                                company.fiscalYearMetricsMap["currentYear"].paid +
                                company.fiscalYearMetricsMap["currentYear"].expired;
                            this.currentYearTurnoverExpected = this.currentYearTurnover + company.fiscalYearMetricsMap["currentYear"].expected;
                        }
                        if (company && company.metrics) {
                            this.totalTurnover = company.metrics.invoiced +
                                company.metrics.paid +
                                company.metrics.expired;
                        }
                    });
            } else {
                this.editMode = true;
            }
        });
    }

    private buildCompanyFiscalYearBounds(company: CompanyModel) {
        let fiscalYear = company.fiscalYear;
        // Sorry for code below
        let startMonth = Moment(fiscalYear.start).add(-1, 'd').locale('fr').format('MMMM');
        let endMonth = Moment(fiscalYear.end).add(1, 'd').locale('fr').format('MMMM');
        this.companyFiscalYearBounds = '(' + startMonth + ' - ' + endMonth + ')';

    }

    public save() {
        if (!this.customer) {
            this.customer = new CompanyModel();
        }
        _.merge(this.customer, this.customer, this.form.value);
        this.companyService.updateCompany(this.customer).subscribe((company) => {
                this.customer = company;
                this.form.setValue(this.updateForm(company));
                this.editMode = false;
                this.alertService.success({title: 'alert.update.success', customClass: 'swal2-for-edit'});
            },
            () => {
                this.alertService.error({title: 'alert.update.error', customClass: 'swal2-for-edit'});
            });
    }

    public create() {
        if (!this.customer) {
            this.customer = new CompanyModel();
        }
        _.merge(this.customer, this.customer, this.form.value);
        this.companyService.createCompany(this.customer).subscribe((company) => {
                this.customer = company;
                this.form.setValue(this.updateForm(company));
                this.editMode = false;
                this.alertService.success({title: 'alert.creation.success', customClass: 'swal2-for-edit'});
            },
            () => {
                this.alertService.error({title: 'alert.creation.error', customClass: 'swal2-for-edit'});
            });
    }

    public reset() {
        this.form.setValue(this.updateForm(this.customer));
        this.editMode = false;
    }

    public delete() {
        this.alertService.confirm({title: 'alert.confirm.deletion'}).then(
            (result) => {
                if (result.value) {
                    this.companyService.deleteCompany(this.customer)
                        .subscribe(() => {
                            this.router.navigate(['app/customers']);
                        });
                }
            }
        );
    }

    public goBack() {
        this.location.back();
    }

}
