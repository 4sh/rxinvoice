import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Business} from '../../../domain/commercial-relationship/business';
import * as _ from 'lodash';

@Component({
    selector: 'business-detail',
    templateUrl: './business-detail.component.html',
    styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {

    @Input() businessList: Business[];
    @Input() editMode: boolean;
    @Output() businessChange: EventEmitter<Business[]> = new EventEmitter();

    public newBusiness: Business = new Business();

    constructor() {
    }

    ngOnInit() {
        if (!this.businessList) {
            this.businessList = [];
        }
    }

    public addBusiness() {
        this.businessList.push(_.cloneDeep(this.newBusiness));
        this.newBusiness = new Business();
        this.businessChange.emit(this.businessList);
    }

    public deletedBusiness(bsnToRemove) {
        this.businessList = this.businessList.filter(bsn => bsn !== bsnToRemove);
        this.businessChange.emit(this.businessList);
    }
}
