import {Injectable} from '@angular/core';
import {assign} from 'lodash';
import {TranslateService} from '@ngx-translate/core';
import swal from 'sweetalert2';

@Injectable()
export class SweetAlertService {

    constructor(private translateService: TranslateService) {

    }

    private question(options: SweetAlertOptions) {
        const baseOptions = {
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: this.translateService.instant('button.confirm'),
            cancelButtonText: this.translateService.instant('button.no')
        };
        if (options.text) { options.text = this.translateService.instant(options.text); }
        if (options.title) {  options.title = this.translateService.instant(options.title); }
        return swal(assign(baseOptions, options));
    }

    private alert(options: SweetAlertOptions) {
        if (options.text) { options.text = this.translateService.instant(options.text); }
        if (options.title) { options.title = this.translateService.instant(options.title); }
        const baseOptions = {
            confirmButtonText: 'OK',
            position: 'center',
            showConfirmButton: false,
            showCloseButton: false,
            timer: 1500
        };
        return swal(assign(baseOptions, options));
    }

    confirm(options: SweetAlertOptions) {
        return this.question(assign({type: 'question'}, options));
    }

    success(options: SweetAlertOptions) {
        return this.alert(assign({type: 'success'}, options));
    }

    error(options: SweetAlertOptions) {
        return this.alert(assign({type: 'error'}, options));
    }

    warning(options: SweetAlertOptions) {
        return this.alert(assign({type: 'warning'}, options));
    }

    info(options: SweetAlertOptions) {
        return this.alert(assign({type: 'info'}, options));
    }
}

class SweetAlertOptions {
    title?: string;
    text?: string;
    type?: string;
    position?: string;
    timer?: number;
    showCancelButton?: string;
    confirmButtonColor?: string;
    cancelButtonColor?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonClass?: string;
    cancelButtonClass?: string;
    buttonsStyling?: boolean;
    reverseButtons?: boolean;
    allowOutsideClick?: boolean;
    allowEscapeKey?: boolean;
    showCloseButton?: boolean;
    customClass?: string;
}
