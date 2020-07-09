import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'a-invoice-status',
  templateUrl: './a-invoice-status.component.html',
  styleUrls: ['./a-invoice-status.component.scss']
})
export class AInvoiceStatusComponent implements OnInit {

  @Input() statusLabel: string;

  constructor() { }

  ngOnInit(): void {
  }

}
