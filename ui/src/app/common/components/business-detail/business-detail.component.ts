import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BusinessModel} from '../../../models/business.model';
import {plainToClass} from 'class-transformer';

@Component({
  selector: 'business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {

    @Input() business: BusinessModel[];
    @Input() editMode: boolean;
    @Output() businessChange: EventEmitter<BusinessModel[]> = new EventEmitter();
    @ViewChild('bsnForm') bsnForm: FormGroup;

  constructor() { }

  ngOnInit() {
      if (!this.business) { this.business = []; }
  }

    public addBusiness() {
        const newBusiness = plainToClass(BusinessModel, this.bsnForm.value as Object);
        this.business.push(newBusiness);
        this.businessChange.emit(this.business);
        this.bsnForm.reset();
    }

    public deletedBusiness(bsnToRemove) {
        this.business = this.business.filter(bsn => bsn !== bsnToRemove);
        this.businessChange.emit(this.business);
        this.bsnForm.reset();
    }

}
