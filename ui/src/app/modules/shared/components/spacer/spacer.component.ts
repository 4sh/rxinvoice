import { Component, Input } from '@angular/core';

@Component({
    selector: 'spacer',
    templateUrl: './spacer.component.html',
    styleUrls: ['./spacer.component.scss']
})
export class SpacerComponent {

    @Input()
    public size: number;
}