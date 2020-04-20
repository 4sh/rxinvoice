import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {

    @Input() showLabel = true;
    @Input() label: String;
    @Input() item = false;
    @Input() disabled = false;
    @Output() itemChange: EventEmitter<boolean> = new EventEmitter();
}
