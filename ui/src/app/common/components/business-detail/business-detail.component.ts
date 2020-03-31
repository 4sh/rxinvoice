import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BusinessModel} from '../../../models/business.model';
import * as _ from 'lodash';

@Component({
    selector: 'business-detail',
    templateUrl: './business-detail.component.html',
    styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {

    @Input() businessList: BusinessModel[];
    @Input() editMode: boolean;
    @Output() businessChange: EventEmitter<BusinessModel[]> = new EventEmitter();

    public newBusiness: BusinessModel = new BusinessModel();

    constructor() {
    }

    ngOnInit() {
        if (!this.businessList) {
            this.businessList = [];
        }
    }

    public addBusiness() {
        this.businessList.push(_.cloneDeep(this.newBusiness));
        this.newBusiness = new BusinessModel();
        this.businessChange.emit(this.businessList);
    }

    public deletedBusiness(bsnToRemove) {
        this.businessList = this.businessList.filter(bsn => bsn !== bsnToRemove);
        this.businessChange.emit(this.businessList);
    }
}
