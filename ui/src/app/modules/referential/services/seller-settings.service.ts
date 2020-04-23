import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SellerSettings} from '../../../domain/company/seller-settings';
import {plainToClass} from 'class-transformer';
import {HttpClient} from '@angular/common/http';
import {Company} from '../../../domain/company/company';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class SellerSettingsService {

    private baseUrl = '/api/companies';

    constructor(private http: HttpClient) {
    }

    public saveSellerSettings(companyId: string, sellerSettingsModel: SellerSettings): Observable<SellerSettings> {
        return this.http
            .put(`${this.baseUrl}/${companyId}/accountantConfiguration`, sellerSettingsModel)
            .pipe(
                map((result: any) => plainToClass(SellerSettings, result as Object)),
                catchError((response: Response) => observableThrowError({
                    message: 'Unable to update seller settings',
                    response: response
                })));
    }

    public fetchSellerSettings(companyId: string): Observable<SellerSettings> {
        return this.http
            .get<Company>(`${this.baseUrl}/${companyId}`)
            .pipe(map((result: any) => plainToClass(Company, result as Object)),
                map(company => company.sellerSettings),
                catchError((response: Response) => observableThrowError({
                    message: 'Unable to update seller settings',
                    response: response
                })));
    }
}
