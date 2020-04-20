import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../../domain/user/user';
import {Activity} from '../../../domain/common/activity';
import {ActivityService} from '../../services/activity.service';
import * as moment from 'moment';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

    activityMenuOpen = false;
    user: User;
    activities: Activity[];

    constructor(private authenticationService: AuthenticationService,
                private activityService: ActivityService) {
    }

    ngOnInit() {
        this.user = this.authenticationService.getCurrentUser();
        this.activityService.fetchActivities()
            .subscribe(activities =>  {
                this.activities = activities;
            });
    }

    public getMomentFromNow(date) {
        return moment(date).locale('fr').fromNow();
    }

    generateUrl(activity: Activity) {
        switch (activity.objectType) {
            case 'Invoice': {
                if (activity.type !== 'DELETE') {
                    return '/app/invoices/detail/' + activity.objectKey;
                }
                break;
            }
            case 'Company': {
               if (activity.type !== 'DELETE') {
                   return '/app/companies/detail/' + activity.objectKey;
               }
                break;
            }
            default: {
                break;
            }
        }
    }

}
