import {Component, EventEmitter, Input, Output} from '@angular/core';
import {fromRole, fromSize, fromVisibility, Role, Size, Visibility} from '../buttons-utils';

@Component({
  selector: 'a-button-default',
  templateUrl: './a-button-default.component.html',
  styleUrls: [
    './../buttons.scss',
    './a-button-default.component.scss'
  ]
})

export class AButtonDefaultComponent {

  @Input()
  public disabled: boolean;

  @Input()
  public validate: boolean;

  @Input()
  public visibility: Visibility = 'MEDIUM';

  @Input()
  public size: Size = 'DEFAULT';

  @Input()
  public role: Role = 'DEFAULT';

  @Output()
  public click: EventEmitter<MouseEvent> = new EventEmitter();

  public fromVisibility = fromVisibility;
  public fromSize = fromSize;
  public fromRole = fromRole;

  constructor() {
  }

  public doAction(event: MouseEvent): void {
    event.stopPropagation();
    this.click.emit(event);
  }
}
