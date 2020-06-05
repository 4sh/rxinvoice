import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../common/services/authentication.service';

@Component({
    selector: 'navigation-menu',
    templateUrl: './navigation-menu.component.html',
    styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
    draftMenuVisible: Boolean;

    constructor(private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.draftMenuVisible = !this.authenticationService.getCurrentUser().isAdministrative();
    }

}
