import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Customer} from "../../../../domain/company/customer";

@Component({
    selector: 'customers-list',
    templateUrl: './customers-list.component.html',
    styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

    @Input() customers: Customer[];
    @Input() isPending: boolean;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    public goToDetail(customer) {
        this.router.navigate(['/customers/detail/' + customer._id]);
    }

}
