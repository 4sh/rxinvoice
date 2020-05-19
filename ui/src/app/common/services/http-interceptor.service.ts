import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {Router} from '@angular/router';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const locale: string = navigator.language;
        req = req.clone({headers: req.headers.set('Accept-Language', locale)});

        return next
            .handle(req)
            .pipe(catchError((error) => {
                    if (error.status === 401) {
                        this.router.navigate(['/login']);
                    }
                    return throwError(error.message);
                })
            );
    }
}
