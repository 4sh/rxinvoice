export type Visibility = 'HIGH' | 'MEDIUM' | 'LOW';

export function fromVisibility(visibility: Visibility): string {
    switch (visibility) {
        case 'HIGH':
            return '_high';
        case 'MEDIUM':
            return '_medium';
        case 'LOW':
            return '_low';
    }
}

export type Size = 'LARGE' | 'DEFAULT' | 'SMALL' | 'TINY';


export function fromSize(size: Size): string {
    switch (size) {
        case 'LARGE':
            return '_large';
        case 'DEFAULT':
            return '_default';
        case 'SMALL':
            return '_small';
        case 'TINY':
            return '_tiny';
    }
}

export type Role = 'NEXT' | 'PREVIOUS' | 'UPLOAD' | 'DEFAULT';

export function fromRole(role: Role): string {
    switch (role) {
        case 'NEXT':
            return '_next';
        case 'PREVIOUS':
            return '_previous';
        case 'UPLOAD':
            return '_upload';
        case 'DEFAULT':
            return '';
    }
}
