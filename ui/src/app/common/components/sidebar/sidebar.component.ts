import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    draftMenuVisible: Boolean;

    constructor(private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.draftMenuVisible = !this.authenticationService.getCurrentUser().isAdministrative();
    }

}
