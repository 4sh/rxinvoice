import {Component, Input} from '@angular/core';

@Component({
  selector: 'a-link-icon',
  templateUrl: './a-link-icon.component.html',
  styleUrls: ['./a-link-icon.component.scss']
})
export class ALinkIconComponent {
  @Input()
  public disabled: boolean = false;

  @Input()
  public visibility: string = '_medium';

  constructor() {
  }
}
