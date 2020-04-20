import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';
import {InvoiceLine} from '../../../domain/invoice/invoice-line';
import {LineMoveEvent} from './line-move-event';
import {VatRate} from '../../../domain/common/vat-rate';

@Component({
    selector: 'invoice-lines-detail',
    templateUrl: './invoice-lines-detail.component.html',
    styleUrls: ['./invoice-lines-detail.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}],
})
export class InvoiceLinesDetailComponent implements OnInit {

    @Input() lines: InvoiceLine[];
    @Input() companyRef: string;
    @Input() editMode: boolean;
    @Input() vatEnabled: boolean;

    @Output() linesChange: EventEmitter<InvoiceLine[]> = new EventEmitter();

    private newLine: InvoiceLine;

    ngOnInit() {
        if (!this.lines) {
            this.lines = [];
        }
        this.newLine = this.createNewLine();
    }

    public addLine(line: InvoiceLine) {
        this.lines.push(line);
        this.newLine = this.createNewLine();
        this.linesChange.emit(this.lines);
    }

    public deleteLine(lineToRemove: InvoiceLine) {
        this.lines = this.lines.filter(line => line !== lineToRemove);
        this.linesChange.emit(this.lines);
    }

    private createNewLine(): InvoiceLine {
        let line = new InvoiceLine();
        line.vat = new VatRate();
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
