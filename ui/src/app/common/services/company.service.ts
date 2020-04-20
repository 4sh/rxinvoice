import { Injectable } from '@angular/core';
import { Company } from '../../domain/company/company';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { plainToClass } from 'class-transformer';



@Injectable()
export class CompanyService {

    private baseUrl = '/api/companies';

    constructor(private http: HttpClient) { }

    public fetchCompanies(query?): Observable<Company[]> {
        const params = (query ? {params: {query: query}} : undefined);
        return this.http
            .get(this.baseUrl, params)
            .map((result: any) => plainToClass(Company, result as Object[]))
            .catch((response: Response) => Observable.throw({ message: 'Unable to fetch companies', response: response }));
    }

    public fetchCompanyBuyers(): Observable<Company[]> {
        return this.http
            .get(this.baseUrl + '/buyers')
            .map((result: any) => plainToClass(Company, result as Object[]))
            .catch((response: Response) => Observable.throw({ message: 'Unable to fetch buyers', response: response }));
    }

    public fetchCompany(id): Observable<Company> {
        return this.http
            .get(this.baseUrl + '/' + id)
            .map((result: any) => plainToClass(Company, result as Object))
            .catch((response: Response) => Observable.throw({ message: 'Unable to fetch company', response: response }));
    }

    public createCompany(company): Observable<Company> {
        return this.http
            .post(this.baseUrl, company)
            .map((result: any) => plainToClass(Company, result as Object))
            .catch((response: Response) => Observable.throw({ message: 'Unable to create company', response: response }));
    }

    public updateCompany(company): Observable<Company> {
        return this.http
            .put(this.baseUrl + '/' + company._id, company)
            .map((result: any) => plainToClass(Company, result as Object))
            .catch((response: Response) => Observable.throw({ message: 'Unable to update company', response: response }));
    }

    public deleteCompany(company): Observable<Company> {
        return this.http
            .delete(this.baseUrl + '/' + company._id, company)
            .map((result: any) => plainToClass(Company, result as Object))
            .catch((response: Response) => Observable.throw({ message: 'Unable to delete company', response: response }));
    }
}
