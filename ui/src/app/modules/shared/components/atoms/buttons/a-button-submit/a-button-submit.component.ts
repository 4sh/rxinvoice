import {Component, EventEmitter, Input, Output} from '@angular/core';
import {fromRole, fromSize, Role, Size} from '../buttons-utils';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'a-button-submit',
  templateUrl: './a-button-submit.component.html',
  styleUrls: [
    './../buttons.scss',
    './a-button-submit.component.scss'
  ],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})


export class AButtonSubmitComponent {

  @Input()
  public disabled: boolean = false;

  @Input()
  public validate: boolean;

  @Input()
  public size: Size = 'DEFAULT';

  @Input()
  public role: Role = 'DEFAULT';

  public fromSize = fromSize;
  public fromRole = fromRole;

  @Output()
  public click: EventEmitter<null> = new EventEmitter();

  constructor() {
  }

  public doAction(event: MouseEvent): void {
    event.stopPropagation();
    this.click.emit();
  }
}
