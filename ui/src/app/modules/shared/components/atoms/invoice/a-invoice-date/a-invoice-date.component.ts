import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'a-invoice-date',
  templateUrl: './a-invoice-date.component.html',
  styleUrls: ['./a-invoice-date.component.scss']
})
export class AInvoiceDateComponent implements OnInit {

  @Input() invoiceDate: string;
  @Input() statusDate: string;

  constructor() { }

  ngOnInit(): void {
  }

}
