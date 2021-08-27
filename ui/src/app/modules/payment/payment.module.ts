import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentService} from "./services/payment.service";


@NgModule({
    declarations: [],
    providers: [
        PaymentService
    ],
    imports: [
        CommonModule
    ]
})
export class PaymentModule {
}
