import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Vendor} from "../../../../domain/company/vendor";

@Component({
    selector: 'vendors-list',
    templateUrl: './vendors-list.component.html',
    styleUrls: ['./vendors-list.component.scss']
})
export class VendorsListComponent implements OnInit {

    @Input() vendors: Vendor[];
    @Input() isPending: boolean;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    public goToDetail(vendor) {
        this.router.navigate(['/vendors/detail/' + vendor._id]);
    }
}
