import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from "../../../../domain/company/customer";
import {CustomerService} from "../../services/customer.service";

@Component({
    selector: 'customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    public customers: Customer[];
    public filterString: string;
    public isPending = true;
    public query: string;
    public isReverse = false;


    constructor(private customerService: CustomerService,
                private router: Router,
                private route: ActivatedRoute) {
        this.toggleFilter('name');
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.query = params.get('query');
        });
        this.search();
        // TODO add computed info mix with company model, maybe like a companyInfo to get
        // all the revenues and fiscal info depending of the current user fiscalyear variable

    }

    public search(): void {
        this.customers = [];
        this.isPending = true;
        this.customerService.fetchCustomers(this.query)
            .subscribe((customers) => {
                this.customers = customers;
                this.isPending = false;
                this.router.navigate([], {replaceUrl: true, queryParams: {query: this.query}});
            });
    }

    public toggleFilter(string): void {
        this.isReverse = string === 'lastSendDate' || string === 'lastPaymentDate' || string === 'commercialRelationship.companyMetrics.currentYear.invoiced';
        this.filterString = string;
    }

    public getNumberOfBusiness(): number {
        if (this.customers && this.customers.length) {
            return this.customers.filter(customer => customer.commercialRelationship.businessList)
                .map(customer => customer.commercialRelationship.businessList.length)
                .reduce((a, b) => a + b, 0);
        } else {
            return 0;
        }
    }

}
