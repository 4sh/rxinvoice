import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class AbstractComponent implements OnDestroy {

    protected componentDestroy: Subject<void> = new Subject<void>();

    ngOnDestroy(): void {
        this.componentDestroy.next();
        this.componentDestroy.complete();
    }
}
