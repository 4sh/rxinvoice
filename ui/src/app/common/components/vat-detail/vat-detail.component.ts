import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {plainToClass} from 'class-transformer';
import {VATModel} from '../../../models/VAT.model';
import {VatRateModel} from '../../../models/vat-rate.model';

@Component({
    selector: 'vat-detail',
    templateUrl: './vat-detail.component.html',
    styleUrls: ['./vat-detail.component.scss']
})
export class VatDetailComponent implements OnInit {

    @Input() vats: VatRateModel[];
    @Input() editMode: boolean;
    @Output() vatsChange: EventEmitter<VatRateModel[]> = new EventEmitter();
    @ViewChild('vatForm') vatForm: FormGroup;

  constructor() { }

    ngOnInit() {
        if (!this.vats) { this.vats = []; }
    }

    public addVat() {
        const newVat = plainToClass(VatRateModel, this.vatForm.value as Object);
        this.vats.push(newVat);
        this.vatsChange.emit(this.vats);
        this.vatForm.reset();
    }

    public deletedVat(vatToRemove) {
        this.vats = this.vats.filter(vat => vat !== vatToRemove);
        this.vatsChange.emit(this.vats);
        this.vatForm.reset();
    }
}
