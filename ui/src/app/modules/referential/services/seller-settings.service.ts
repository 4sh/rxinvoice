import {Injectable} from '@angular/core';
import {SellerSettings} from '../../../domain/company/seller-settings';
import {Observable} from 'rxjs/Observable';
import {plainToClass} from 'class-transformer';
import {HttpClient} from '@angular/common/http';
import {Company} from '../../../domain/company/company';

@Injectable()
export class SellerSettingsService {

    private baseUrl: string = '/api/companies';

    constructor(private http: HttpClient) {
    }

    public saveSellerSettings(companyId: string, sellerSettingsModel: SellerSettings): Observable<SellerSettings> {
        return this.http
            .put(`${this.baseUrl}/${companyId}/accountantConfiguration`, sellerSettingsModel)
            .map((result: any) => plainToClass(SellerSettings, result as Object))
            .catch((response: Response) => Observable.throw({
                message: 'Unable to update seller settings',
                response: response
            }));
    }

    public fetchSellerSettings(companyId: string): Observable<SellerSettings> {
        return this.http
            .get<Company>(`${this.baseUrl}/${companyId}`)
            .map((result: any) => plainToClass(Company, result as Object))
            .map(company => company.sellerSettings)
            .catch((response: Response) => Observable.throw({
                message: 'Unable to update seller settings',
                response: response
            }));
    }
}
