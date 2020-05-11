import {Component, Input} from '@angular/core';
import {Role, Size, fromSize, fromRole} from '../buttons-utils';

@Component({
  selector: 'a-link-cancel',
  templateUrl: './a-link-cancel.component.html',
  styleUrls: [
    './../buttons.scss',
    './a-link-cancel.component.scss'
  ]
})
export class ALinkCancelComponent {
  @Input()
  public disabled: boolean = false;

  @Input()
  public size: Size = 'DEFAULT';

  @Input()
  public role: Role = 'DEFAULT';

  public fromSize = fromSize;
  public fromRole = fromRole;

  constructor() {
  }
}
