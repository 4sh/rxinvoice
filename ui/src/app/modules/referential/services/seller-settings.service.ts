import {Injectable} from '@angular/core';
import {SellerSettingsModel} from '../../../models/seller-settings.model';
import {Observable} from 'rxjs/Observable';
import {plainToClass} from 'class-transformer';
import {HttpClient} from '@angular/common/http';
import {CompanyModel} from '../../../models/company.model';

@Injectable()
export class SellerSettingsService {

    private baseUrl: string = '/api/companies';

    constructor(private http: HttpClient) {
    }

    public saveSellerSettings(companyId: string, sellerSettingsModel: SellerSettingsModel): Observable<SellerSettingsModel> {
        return this.http
            .put(`${this.baseUrl}/${companyId}/accountantConfiguration`, sellerSettingsModel)
            .map((result: any) => plainToClass(SellerSettingsModel, result as Object))
            .catch((response: Response) => Observable.throw({
                message: 'Unable to update seller settings',
                response: response
            }));
    }

    public fetchSellerSettings(companyId: string): Observable<SellerSettingsModel> {
        return this.http
            .get<CompanyModel>(`${this.baseUrl}/${companyId}`)
            .map((result: any) => plainToClass(CompanyModel, result as Object))
            .map(company => company.sellerSettings)
            .catch((response: Response) => Observable.throw({
                message: 'Unable to update seller settings',
                response: response
            }));
    }
}
