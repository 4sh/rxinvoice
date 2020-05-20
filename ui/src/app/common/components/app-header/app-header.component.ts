import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../../domain/user/user';
import {Activity} from '../../../domain/common/activity';
import {ActivityService} from '../../services/activity.service';
import * as moment from 'moment';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

    activityMenuOpen = false;
    user: User;
    activities: Activity[];
    pageTitle: string;

    constructor(private authenticationService: AuthenticationService,
                private activityService: ActivityService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.user = this.authenticationService.getCurrentUser();
        this.pageTitle = this.activatedRoute.firstChild.snapshot.data['title'];
        this.activityService.fetchActivities()
            .subscribe(activities =>  {
                this.activities = activities;
            });
      this.router
          .events.pipe(
          filter(event => event instanceof NavigationEnd),
          map(() => {
              const child = this.activatedRoute.firstChild;
              if (child.snapshot.data['title']) {
                  return child.snapshot.data['title'];
              }
              return '';
          })
      ).subscribe((ttl: string) => {
          this.pageTitle = ttl;
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

    public logout() {
        this.authService.logout();
    }

}
