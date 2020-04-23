import {filter} from 'rxjs/operators';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Company} from '../../domain/company/company';
import {FormGroup} from '@angular/forms';
import {CompanyService} from '../../common/services/company.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as Moment from 'moment';
import {SweetAlertService} from '../../modules/shared/services/sweetAlert.service';
import {AuthenticationService} from '../../common/services/authentication.service';
import {Location} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

    public seller: Company;
    public customer = new Company();
    public editMode = false;
    public companyId: string;
    public canDelete: boolean;
    @ViewChild('customerForm', { static: true }) form: FormGroup;
    public currentYearTurnover: number = 0;
    public currentYearTurnoverExpected: number = 0;
    public totalTurnover: number = 0;
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
        const currentUser = this.authService.getCurrentUser();
        this.authService.companyEvents.pipe(filter(company => !!company)).subscribe(company => {
            this.seller = company;
            this.buildCompanyFiscalYearBounds(this.seller);
        });

        this.canDelete = currentUser.roles.filter(role => role === 'admin').length > 0;
    }


    public fetchCustomer() {
        this.route.params.subscribe(params => {
            if (!this.companyId) {
                this.companyId = params['id'];
            }
            if (this.companyId) {
                this.companyService.fetchCompany(this.companyId)
                    .subscribe((company: Company) => {
                        this.customer = company;
                        if (company && company.commercialRelationship && company.commercialRelationship.companyMetrics.currentYear) {
                            const companyMetrics = company.commercialRelationship.companyMetrics;

                            this.currentYearTurnover =
                                companyMetrics.currentYear.invoiced +
                                companyMetrics.currentYear.paid +
                                companyMetrics.currentYear.expired;

                            this.currentYearTurnoverExpected =
                                this.currentYearTurnover +
                                companyMetrics.currentYear.expected;

                            this.totalTurnover =
                                companyMetrics.global.invoiced +
                                companyMetrics.global.paid +
                                companyMetrics.global.expired;
                        }
                    });
            } else {
                this.editMode = true;
            }
        });
    }

    private buildCompanyFiscalYearBounds(company: Company) {
        let fiscalYear = company.fiscalYear;
        let now = Moment();

        let startDate = Moment(fiscalYear.start).year(now.year());
        let endDate = Moment(fiscalYear.end).year(now.year());

        if (now.isBefore(startDate)) {
            startDate.year(startDate.year() - 1);
        }
        if (now.isAfter(endDate)) {
            endDate.year(endDate.year() + 1);
        }

        // Sorry for code below
        let startMonth = startDate
            .add(1, 'd')
            .locale('fr')
            .format('MMMM YYYY');
        let endMonth = endDate
            .add(-1, 'd')
            .locale('fr')
            .format('MMMM YYYY');
        this.companyFiscalYearBounds = '(' + startMonth + ' - ' + endMonth + ')';
    }

    public save() {
        if (!this.customer) {
            this.customer = new Company();
        }
        this.companyService.updateCompany(this.customer).subscribe((company) => {
                this.customer = company;
                this.editMode = false;
                this.alertService.success({title: 'alert.update.success', customClass: 'swal2-for-edit'});
            },
            () => {
                this.alertService.error({title: 'alert.update.error', customClass: 'swal2-for-edit'});
            });
    }

    public create() {
        if (!this.customer) {
            this.customer = new Company();
        }
        this.companyService.createCompany(this.customer).subscribe((company) => {
                this.customer = company;
                this.editMode = false;
                this.alertService.success({title: 'alert.creation.success', customClass: 'swal2-for-edit'});
            },
            () => {
                this.alertService.error({title: 'alert.creation.error', customClass: 'swal2-for-edit'});
            });
    }

    public reset() {
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

    public isSirenDisabled(): boolean {
        return !this.editMode || !!this.customer._id;
    }

}
