import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {OrderModule} from './order.module';
import {DndDraggableDirective} from 'ngx-drag-drop';
import {OrdersComponent} from "./components/orders/orders.component";

@NgModule({
    imports: [
        OrderModule,
        RouterModule.forChild([
                {path: '', component: OrdersComponent},
            ]
        )
    ],
    providers: [
        DndDraggableDirective
    ]
})
export class OrderRoutingModule {
}
