import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

export class SearchParams {

    public static toHttpParams(params): HttpParams {
        if (!params) {
            return new HttpParams();
        }
        return Object
            .getOwnPropertyNames(params)
            .filter(key => params[key] !== null && params[key] !== undefined && params[key] !== '')
            .reduce((p, key) => {
                let value = params[key];
                if (value instanceof Date) {
                    value = moment(value).format('YYYY-MM-DD');
                } else if (value.getUri) {
                    value = value.getUri();
                } else if (value instanceof Array) {
                    value = value.join(",")
                } else if (value instanceof Object) {
                    value = value._id;
                }
                return p.set(key, value);
            }, new HttpParams());
    }
}
