import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Activity} from '../../../domain/common/activity';
import * as moment from 'moment';

@Component({
    selector: 'activity-panel',
    templateUrl: './activity-panel.component.html',
    styleUrls: ['./activity-panel.component.scss']
})
export class ActivityPanelComponent implements OnInit {

    @Input() activities: Activity[];
    @Input() editMode: boolean;
    @Output() activitiesChange: EventEmitter<Activity[]> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    getMomentFromNow(date) {
        return moment(date).locale('fr').fromNow();
    }

}
