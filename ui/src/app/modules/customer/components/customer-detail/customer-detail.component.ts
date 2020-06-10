import {filter} from 'rxjs/operators';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Company} from '../../../../domain/company/company';
import {FormGroup} from '@angular/forms';
import {CompanyService} from '../../../../common/services/company.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as Moment from 'moment';
import {SweetAlertService} from '../../../shared/services/sweetAlert.service';
import {AuthenticationService} from '../../../../common/services/authentication.service';
import {Location} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {Business} from '../../../../domain/commercial-relationship/business';

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

    public seller: Company;
    public customer = new Company();
    public canDelete: boolean;
    @ViewChild('customerForm', {static: true}) form: FormGroup;
    public currentYearTurnover = 0;
    public currentYearTurnoverExpected = 0;
    public totalTurnover = 0;
    public companyFiscalYearBounds: string;
    public newBusiness: Business = new Business();

    public currentTabIndex = 1;

    constructor(private companyService: CompanyService,
                private route: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private alertService: SweetAlertService,
                private authService: AuthenticationService,
                private location: Location) {
    }

    ngOnInit() {

        this.route.data.subscribe(routeData => {
            this.customer = routeData.customer;
            this.authService.companyEvents
                .subscribe(companyEvent => {
                    this.seller = companyEvent;
                    this.buildCompanyFiscalYearBounds(this.seller);
                    this.fillCustomerMetrics(this.customer);
                });
            this.authService.userEvents
                .subscribe(currentUser =>
                    this.canDelete = currentUser.roles.filter(role => role === 'admin' || role === 'seller').length > 0
                );
        });
    }

    private fillCustomerMetrics(customer: Company) {
        if (customer && customer.commercialRelationship && customer.commercialRelationship.companyMetrics.currentYear) {
            const companyMetrics = customer.commercialRelationship.companyMetrics;

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
    }

    private buildCompanyFiscalYearBounds(company: Company) {
        const fiscalYear = company.fiscalYear;
        const now = Moment();

        const startDate = Moment(fiscalYear.start).year(now.year());
        const endDate = Moment(fiscalYear.end).year(now.year());

        if (now.isBefore(startDate)) {
            startDate.year(startDate.year() - 1);
        }
        if (now.isAfter(endDate)) {
            endDate.year(endDate.year() + 1);
        }

        // Sorry for code below
        const startMonth = startDate
            .add(1, 'd')
            .locale('fr')
            .format('MMMM YYYY');
        const endMonth = endDate
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
                this.alertService.success({title: 'alert.creation.success', customClass: 'swal2-for-edit'});
            },
            () => {
                this.alertService.error({title: 'alert.creation.error', customClass: 'swal2-for-edit'});
            });
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
        return !!this.customer._id && !!this.customer.siren;
    }

    public businessAdded(): void {
        this.newBusiness = new Business();
    }

    public showGeneralInformationTab(): void {
        this.currentTabIndex = 1;
    }

    public showCommercialRelationTab(): void {
        this.currentTabIndex = 2;
    }
}
