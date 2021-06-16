import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VendorsComponent} from "./components/vendors/vendors.component";
import {VendorsListComponent} from "./components/vendors-list/vendors-list.component";
import {VendorDetailComponent} from "./components/vendor-detail/vendor-detail.component";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonsModule} from "../shared/components/atoms/buttons/buttons.module";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {VendorService} from "./services/vendor.service";
import {VendorResolver} from "./resolvers/vendor.resolver";

const components = [
    VendorsComponent,
    VendorsListComponent,
    VendorDetailComponent
]

@NgModule({
    declarations: [components],
    providers: [
        VendorService,
        VendorResolver
    ],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        NgSelectModule,
        SharedModule,
        ButtonsModule
    ]
})
export class VendorModule {
}
