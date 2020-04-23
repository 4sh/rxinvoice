import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Company} from '../../domain/company/company';
import {HttpClient} from '@angular/common/http';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs/internal/Observable';
import {throwError} from 'rxjs/internal/observable/throwError';


@Injectable()
export class CompanyService {

    private baseUrl = '/api/companies';

    constructor(private http: HttpClient) {
    }

    public fetchCompanies(query?): Observable<Company[]> {
        const params = (query ? {params: {query: query}} : undefined);
        return this.http
            .get(this.baseUrl, params).pipe(
                map((result: any) => plainToClass(Company, result as Object[])),
                catchError((response: Response) => throwError({message: 'Unable to fetch companies', response: response})));
    }

    public fetchCompanyBuyers(): Observable<Company[]> {
        return this.http
            .get(this.baseUrl + '/buyers').pipe(
                map((result: any) => plainToClass(Company, result as Object[])),
                catchError((response: Response) => throwError({message: 'Unable to fetch buyers', response: response})));
    }

    public fetchCompany(id): Observable<Company> {
        return this.http
            .get(this.baseUrl + '/' + id).pipe(
                map((result: any) => plainToClass(Company, result as Object)),
                catchError((response: Response) => throwError({message: 'Unable to fetch company', response: response})));
    }

    public createCompany(company): Observable<Company> {
        return this.http
            .post(this.baseUrl, company).pipe(
                map((result: any) => plainToClass(Company, result as Object)),
                catchError((response: Response) => throwError({message: 'Unable to create company', response: response})));
    }

    public updateCompany(company): Observable<Company> {
        return this.http
            .put(this.baseUrl + '/' + company._id, company).pipe(
                map((result: any) => plainToClass(Company, result as Object)),
                catchError((response: Response) => throwError({message: 'Unable to update company', response: response})));
    }

    public deleteCompany(company): Observable<Company> {
        return this.http
            .delete(this.baseUrl + '/' + company._id, company).pipe(
                map((result: any) => plainToClass(Company, result as Object)),
                catchError((response: Response) => throwError({message: 'Unable to delete company', response: response})));
    }
}
