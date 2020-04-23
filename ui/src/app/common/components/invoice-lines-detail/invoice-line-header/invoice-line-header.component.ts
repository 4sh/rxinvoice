import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'invoice-line-header',
    templateUrl: './invoice-line-header.component.html',
    styleUrls: ['./invoice-line-header.component.scss']
})
export class InvoiceLineHeaderComponent implements OnInit {

    @Input()
    public vatEnabled: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
