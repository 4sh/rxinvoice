import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';
import {InvoiceLineModel} from '../../../models/invoice-line.model';
import {VATModel} from '../../../models/VAT.model';
import {LineMoveEvent} from './line-move-event';
import {VatRateModel} from '../../../models/vat-rate.model';

@Component({
    selector: 'invoice-lines-detail',
    templateUrl: './invoice-lines-detail.component.html',
    styleUrls: ['./invoice-lines-detail.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}],
})
export class InvoiceLinesDetailComponent implements OnInit {

    @Input() lines: InvoiceLineModel[];
    @Input() companyRef: string;
    @Input() editMode: boolean;
    @Input() vatEnabled: boolean;

    @Output() linesChange: EventEmitter<InvoiceLineModel[]> = new EventEmitter();

    private newLine: InvoiceLineModel;

    ngOnInit() {
        if (!this.lines) {
            this.lines = [];
        }
        this.newLine = this.createNewLine();
    }

    public addLine(line: InvoiceLineModel) {
        this.lines.push(line);
        this.newLine = this.createNewLine();
        this.linesChange.emit(this.lines);
    }

    public deleteLine(lineToRemove: InvoiceLineModel) {
        this.lines = this.lines.filter(line => line !== lineToRemove);
        this.linesChange.emit(this.lines);
    }

    private createNewLine(): InvoiceLineModel {
        let line = new InvoiceLineModel();
        line.vat = new VatRateModel();
        return line;
    }

    public lineMoved(lineMoveEvent: LineMoveEvent):void {
        let index = this.lines.indexOf(lineMoveEvent.line);
        if (lineMoveEvent.direction > 0 ) {
            this.lines[index] = this.lines[index + 1];
            this.lines[index + 1] = lineMoveEvent.line;
        } else {
            this.lines[index] = this.lines[index - 1];
            this.lines[index - 1] = lineMoveEvent.line;

        }

    }
}
