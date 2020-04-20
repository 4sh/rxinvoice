import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../common/services/company.service';
import {Company} from '../../domain/company/company';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

   public companies: Company[];
   public filterString: string;
   public isPending = true;
   public query: string;
   public isReverse = false;


    constructor(private companyService: CompanyService,
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
        this.companies = [];
        this.isPending = true;
        this.companyService.fetchCompanies(this.query)
            .subscribe((companies) => {
                this.companies = companies;
                this.isPending = false;
                this.router.navigate([], { replaceUrl: true, queryParams: {query: this.query} });
            });
    }

    public toggleFilter(string): void {
        this.isReverse = string === 'lastSendDate' ||  string === 'lastPaymentDate';
            this.filterString = string;
    }

    public getNumberOfBusiness(): number {
        if (this.companies && this.companies.length) {
            return this.companies.filter(company => company.commercialRelationship.businessList)
                .map(company => company.commercialRelationship.businessList.length)
                .reduce((a, b) => a + b, 0);
        } else {
            return 0;
        }
    }

}
