import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {CustomerService} from '../services/customer.service';
import {Company} from '../../../domain/company/company';

@Injectable()
export class CustomerResolver implements Resolve<Company> {

    constructor(private customerService: CustomerService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Company> {
        const customerId = route.paramMap.get('customerId');
        if (customerId === 'new') {
            return of(new Company());
        }
        return this.customerService.fetchCustomer(customerId)
    }
}
