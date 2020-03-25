import {Component, Input, OnInit} from '@angular/core';
import {InvoiceModel} from "../../../../models/invoice.model";

@Component({
  selector: 'dashboard-ticket',
  templateUrl: './dashboard-ticket.component.html',
  styleUrls: ['./dashboard-ticket.component.scss']
})
export class DashboardTicketComponent implements OnInit {

  @Input()
  public invoice:InvoiceModel;

  public statusClass: string;

  constructor() { }

  ngOnInit() {
    this.statusClass = this.getClassFromStatus();
  }

  private getClassFromStatus() {
    return 'status-' + this.invoice.status.toLowerCase();
  }
}
