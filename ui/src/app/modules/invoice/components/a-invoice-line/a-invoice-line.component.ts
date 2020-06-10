import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm} from '@angular/forms';
import {InvoiceLine} from '../../../../domain/invoice/invoice-line';
import {Invoice} from '../../../../domain/invoice/invoice';
import {VatRate} from '../../../../domain/common/vat-rate';
import {CustomerService} from '../../../customer/services/customer.service';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AInvoiceLineComponent),
    multi: true
};

@Component({
    selector: 'a-invoice-line',
    templateUrl: './a-invoice-line.component.html',
    styleUrls: ['./a-invoice-line.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}],
    providers: [VALUE_ACCESSOR]
})
export class AInvoiceLineComponent implements OnInit, ControlValueAccessor {

    @ViewChild('invoiceLineForm')
    public invoiceLineForm: NgForm;

    public line: InvoiceLine;
    public vatRateList: Array<VatRate>;

    @Input()
    public invoice: Invoice;
    @Input()
    public reorderEnabled: boolean;
    @Input()
    public addActionEnabled: boolean;
    @Input()
    public editActionEnabled: boolean;
    @Input()
    public validateActionEnabled: boolean;
    @Input()
    public deleteActionEnabled: boolean;
    @Input()
    public editable: boolean;

    @Output()
    public lineAddedEventEmitter: EventEmitter<void> = new EventEmitter();
    @Output()
    public lineRemovedEventEmitter: EventEmitter<void> = new EventEmitter();

    private onNgChange: (line: InvoiceLine) => void;
    private onNgTouched: () => void;

    constructor(private customerService: CustomerService) {
    }

    ngOnInit(): void {
        if (this.invoice.buyer && this.invoice.buyer._id) {
            this.customerService.fetchCustomer(this.invoice.buyer._id)
                .subscribe(customer => this.vatRateList = customer.commercialRelationship.vatRates);
        }
    }

    public editLine(): void {
        this.editable = true;
    }

    public checkLine(): void {
        this.editable = false;
        this.onNgChange(this.line);
    }

    public removeLine(): void {
        this.invoice.removeLine(this.line);
        this.lineRemovedEventEmitter.emit();
    }

    public addLine(): void {
        this.invoice.lines.push(this.line);
        this.lineAddedEventEmitter.emit();
        for (const field in this.invoiceLineForm.controls) {
            if (field) {
                this.invoiceLineForm.controls[field].markAsUntouched();
            }
        }
    }

    public quantityUpdated(quantity: number): void {
        this.line.quantity = quantity;
        this.line.grossAmount = this.line.computeGrossAmount();
    }

    public unitCostUpdated(unitCost: number): void {
        this.line.unitCost = unitCost;
        this.line.grossAmount = this.line.computeGrossAmount();
    }

    public vatUpdated(vatRate: VatRate) {
        this.line.vatRate = vatRate;
    }

    registerOnChange(fn: any): void {
        this.onNgChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onNgTouched = fn;
    }

    writeValue(line: InvoiceLine): void {
        this.line = line;
    }
}
