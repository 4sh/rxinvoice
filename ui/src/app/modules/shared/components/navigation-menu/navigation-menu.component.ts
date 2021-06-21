import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../common/services/authentication.service';

@Component({
    selector: 'navigation-menu',
    templateUrl: './navigation-menu.component.html',
    styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
    draftMenuVisible: Boolean;
    isVendor: Boolean;
    isCustomer: Boolean;

    constructor(private authenticationService: AuthenticationService) {
    }

    async ngOnInit() {
        await this.authenticationService.fetchCurrent().toPromise();
        this.draftMenuVisible = !this.authenticationService.getCurrentUser().isAdministrative();

        let company = this.authenticationService.getCurrentCompany();
        this.isVendor = company.vendorRef != null;
        this.isCustomer = company.customerRef != null;
    }

}
