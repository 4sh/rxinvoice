import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Invoice} from '../../../domain/invoice/invoice';
import {InvoiceStatusType} from '../../../domain/invoice/invoice-status.type';
import {RepositoryService} from '../../services/repository.service';

@Component({
    selector: 'quick-status-edit-panel',
    templateUrl: './quick-status-edit-panel.component.html',
    styleUrls: ['./quick-status-edit-panel.component.scss']
})
export class QuickStatusEditPanelComponent implements OnInit {

    public statuses: InvoiceStatusType[];
    @Input() invoice: Invoice;
    @Input() showQuickPanelStatusEdit = false;
    @Output() invoiceUpdate: EventEmitter<Invoice> = new EventEmitter();
    @Output() closeQuickUpdate: EventEmitter<void> = new EventEmitter();

    constructor(private repositoryService: RepositoryService) {
    }

    ngOnInit() {
        this.repositoryService.fetchInvoiceStatus()
            .subscribe(statuses => this.statuses = statuses);
    }

    public updateInvoice(): void {
        this.invoiceUpdate.emit(this.invoice);
    }

    public close(): void {
        this.closeQuickUpdate.emit();
    }
}
