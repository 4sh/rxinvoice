import {Component, EventEmitter, Input, Output} from '@angular/core';
import {fromRole, fromSize, Role, Size} from '../buttons-utils';

@Component({
  selector: 'a-button-cancel',
  templateUrl: './a-button-cancel.component.html',
  styleUrls: [
    './../buttons.scss',
    './a-button-cancel.component.scss'
  ]
})

export class AButtonCancelComponent {
  @Input()
  public disabled: boolean = false;

  @Input()
  public size: Size = 'DEFAULT';

  @Input()
  public role: Role = 'DEFAULT';

  @Output()
  public click: EventEmitter<null> = new EventEmitter();

  public fromSize = fromSize;
  public fromRole = fromRole;

  constructor() {
  }

  public doAction(): void {
    this.click.emit();
  }
}
