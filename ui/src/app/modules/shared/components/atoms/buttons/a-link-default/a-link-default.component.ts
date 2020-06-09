import {Component, Input} from '@angular/core';
import {fromSize, fromVisibility, fromRole, Role, Size, Visibility} from '../buttons-utils';

@Component({
    selector: 'a-link-default',
    templateUrl: './a-link-default.component.html',
    styleUrls: [
        './../buttons.scss',
        './a-link-default.component.scss'
    ]
})
export class ALinkDefaultComponent {
    @Input()
    public disabled: boolean = false;

    @Input()
    public href: string;

    @Input()
    public visibility: Visibility = 'MEDIUM';

    @Input()
    public size: Size = 'DEFAULT';

    @Input()
    public role: Role = 'DEFAULT';

    public fromVisibility = fromVisibility;
    public fromSize = fromSize;
    public fromRole = fromRole;

    constructor() {
    }
}
