import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'a-button-launch',
  templateUrl: './a-button-launch.component.html',
  styleUrls: ['./a-button-launch.component.scss']
})
export class AButtonLaunchComponent implements OnInit {

  @Input() launchLabel: string;

  @Input()
  public launchStyle: LaunchStyle = 'TICKET';

  @Output()
  public click: EventEmitter<MouseEvent> = new EventEmitter();

  constructor() {
  }

  public fromLaunchStyle = fromLaunchStyle;

  public doAction(event: MouseEvent): void {
    event.stopPropagation();
    this.click.emit(event);
  }

  ngOnInit(): void {
  }
}

export type LaunchStyle = 'TICKET' | 'INVOICE' ;

export function fromLaunchStyle(launchStyle: LaunchStyle): string {
  switch (launchStyle) {
    case 'TICKET':
      return '_ticket';
    case 'INVOICE':
      return '_invoice';
  }
}
