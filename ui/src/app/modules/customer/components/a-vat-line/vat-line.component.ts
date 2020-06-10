import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm} from '@angular/forms';
import {VatRate} from '../../../../domain/common/vat-rate';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => VatLineComponent),
  multi: true
};
@Component({
  selector: 'a-vat-line',
  templateUrl: './vat-line.component.html',
  styleUrls: ['./vat-line.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}],
  providers: [VALUE_ACCESSOR]
})
export class VatLineComponent implements OnInit, ControlValueAccessor {

  @ViewChild('vatRateForm')
  public vatRateForm: NgForm;

  public vatRate: VatRate;

  @Input()
  public vatRates: Array<VatRate>;
  @Input()
  public addActionEnabled: boolean;
  @Input()
  public deleteActionEnabled: boolean;
  @Input()
  public editable: boolean;

  @Output()
  public lineAddedEventEmitter: EventEmitter<VatRate> = new EventEmitter();
  @Output()
  public lineRemovedEventEmitter: EventEmitter<void> = new EventEmitter();

  private onNgChange: (line: VatRate) => void;
  private onNgTouched: () => void;

  constructor() {
  }

  ngOnInit(): void {
  }

  public removeLine(): void {
    this.vatRates.splice(this.vatRates.indexOf(this.vatRate), 1);
    this.lineRemovedEventEmitter.emit();
  }

  public addLine(): void {
    this.lineAddedEventEmitter.emit(this.vatRate);
    for (const field in this.vatRateForm.controls) {
      if (field) {
        this.vatRateForm.controls[field].markAsUntouched();
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onNgChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onNgTouched = fn;
  }

  writeValue(vatRate: VatRate): void {
    this.vatRate = vatRate;
  }
}
