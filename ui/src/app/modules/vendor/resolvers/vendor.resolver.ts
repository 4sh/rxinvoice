import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {Vendor} from "../../../domain/company/vendor";
import {VendorService} from "../services/vendor.service";

@Injectable()
export class VendorResolver implements Resolve<Vendor> {

    constructor(private vendorService: VendorService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Vendor> {
        const vendorId = route.paramMap.get('vendorId');
        if (vendorId === 'new') {
            return of(new Vendor());
        }
        return this.vendorService.fetchVendor(vendorId)
    }
}
