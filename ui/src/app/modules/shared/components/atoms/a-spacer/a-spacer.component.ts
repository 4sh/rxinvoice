import { Component, Input } from '@angular/core';

@Component({
    selector: 'a-spacer',
    templateUrl: './a-spacer.component.html',
    styleUrls: ['./a-spacer.component.scss']
})
export class ASpacerComponent {

    @Input()
    public size: number;
}