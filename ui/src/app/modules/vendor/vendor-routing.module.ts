import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {VendorModule} from "./vendor.module";
import {VendorsComponent} from "./components/vendors/vendors.component";
import {VendorDetailComponent} from "./components/vendor-detail/vendor-detail.component";
import {VendorResolver} from "./resolvers/vendor.resolver";

@NgModule({
    imports: [
        VendorModule,
        RouterModule.forChild([
                {
                    path: '', component: VendorsComponent
                },
                {
                    path: 'detail/:vendorId',
                    component: VendorDetailComponent,
                    resolve: {
                        vendor : VendorResolver
                    }
                }
            ]
        )
    ]
})
export class VendorRoutingModule {
}
