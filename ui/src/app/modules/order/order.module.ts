import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedModule} from '../shared/shared.module';
import {FileUploadModule} from 'ng2-file-upload';
import {ButtonsModule} from '../shared/components/atoms/buttons/buttons.module';
import {CustomerModule} from '../customer/customer.module';
import {DndModule} from 'ngx-drag-drop';
import {OrdersComponent} from './components/orders/orders.component';
import {OrderService} from "./services/order.service";
import { OrdersListComponent } from './components/orders-list/orders-list.component';

const components = [
    OrdersListComponent,
    OrdersComponent
];

@NgModule({
    declarations: [components, OrdersListComponent],
    exports: [components],
    providers: [
        OrderService
    ],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        FileUploadModule,
        SharedModule,
        ButtonsModule,
        CustomerModule,
        DndModule
    ]
})
export class OrderModule {
}
