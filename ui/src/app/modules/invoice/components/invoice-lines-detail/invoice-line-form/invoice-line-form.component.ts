import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvoiceLine} from '../../../../../domain/invoice/invoice-line';
import {ControlContainer, NgForm} from '@angular/forms';
import {LineMoveEvent} from '../line-move-event';
import {VatRate} from '../../../../../domain/common/vat-rate';
import {InvoiceLineEditionMode} from '../../../../../domain/invoice/invoice-edition-mode';

@Component({
    selector: 'invoice-line-form',
    templateUrl: './invoice-line-form.component.html',
    styleUrls: ['./invoice-line-form.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class InvoiceLineFormComponent implements OnInit {

    constructor() {
    }

    @Input() companyRef: string;
    @Input() line: InvoiceLine;
    @Input() editionMode: InvoiceLineEditionMode;
    @Input() editable: boolean;
    @Input() vatEnabled: boolean;
    @Input() topArrowDisplayed: boolean;
    @Input() bottomArrowDisplayed: boolean;

    @Output() lineAdded: EventEmitter<InvoiceLine> = new EventEmitter();
    @Output() lineDeleted: EventEmitter<InvoiceLine> = new EventEmitter();
    @Output() lineMoved: EventEmitter<LineMoveEvent> = new EventEmitter();

    ngOnInit() {
    }

    private computeGrossAmount(): void {
        if (this.line && this.line.quantity && this.line.unitCost) {
            this.line.grossAmount = this.line.quantity * this.line.unitCost;
        } else {
            this.line.grossAmount = null;
        }
    }

    public updateVat(vatModel: VatRate) {
        this.line.vatRate = vatModel;
    }

    public unitCostChanged(unitCost: number): void {
        this.line.unitCost = unitCost;
        this.computeGrossAmount();
    }

    public quantityChanged(quantity: number): void {
        this.line.quantity = quantity;
        this.computeGrossAmount();
    }

    public addLine() {
        this.lineAdded.emit(this.line);
    }

    public deleteLine() {
        this.lineDeleted.emit(this.line);
    }

    public moveUp(): void {
        this.lineMoved.emit(new LineMoveEvent(this.line, -1))
    }

    public moveDown(): void {
        this.lineMoved.emit(new LineMoveEvent(this.line, 1))
    }
}
