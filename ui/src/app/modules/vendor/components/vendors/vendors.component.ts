import {Component, OnInit} from '@angular/core';
import {Vendor} from "../../../../domain/company/vendor";
import {VendorService} from "../../services/vendor.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'vendors',
    templateUrl: './vendors.component.html',
    styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

    public vendors: Vendor[];
    public filterString: string;
    public isPending = true;
    public query: string;
    public isReverse = false;

    constructor(private vendorService: VendorService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.query = params.get('query');
        });
        this.search();
    }

    public search(): void {
        this.vendors = [];
        this.isPending = true;
        this.vendorService.fetchVendors(this.query)
            .subscribe((vendors) => {
                this.vendors = vendors;
                this.isPending = false;
                this.router.navigate([], {replaceUrl: true, queryParams: {query: this.query}});
            });
    }

    public toggleFilter(string): void {
        this.isReverse = string === 'lastSendDate' || string === 'lastPaymentDate' || string === 'commercialRelationship.companyMetrics.currentYear.invoiced';
        this.filterString = string;
    }

    public getNumberOfBusiness(): number {
        if (this.vendors && this.vendors.length) {
            return this.vendors.filter(vendor => vendor.commercialRelationship.businessList)
                .map(vendor => vendor.commercialRelationship.businessList.length)
                .reduce((a, b) => a + b, 0);
        } else {
            return 0;
        }
    }
}
