import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor() {};

    intercept(req: HttpRequest< any >, next: HttpHandler): Observable<HttpEvent<any>> {
        const locale: string = navigator.language;
        // FIXME issue with LOCALE_ID , 'en-US' for me...?

        req = req.clone({ headers: req.headers.set('Accept-Language', locale) });
        return next.handle(req);
    }

}
