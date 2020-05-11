import {Component, EventEmitter, Input, Output} from '@angular/core';
import {fromVisibility, Visibility} from '../buttons-utils';

@Component({
  selector: 'a-button-icon',
  templateUrl: './a-button-icon.component.html',
  styleUrls: ['./a-button-icon.component.scss']
})
export class AButtonIconComponent {
  @Input()
  public disabled: boolean = false;

  @Input()
  public visibility: Visibility = 'MEDIUM';

  public fromVisibility = fromVisibility;

  @Output()
  public click: EventEmitter<MouseEvent> = new EventEmitter();

  constructor() {
  }

  public doAction(event: MouseEvent): void {
    event.stopPropagation();
    this.click.emit(event);
  }
}
