import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'a-toggle',
    templateUrl: './a-toggle.component.html',
    styleUrls: ['./a-toggle.component.scss']
})
export class AToggleComponent {

    @Input() showLabel = true;
    @Input() label: String;
    @Input() item = false;
    @Input() disabled = false;
    @Output() itemChange: EventEmitter<boolean> = new EventEmitter();
}
