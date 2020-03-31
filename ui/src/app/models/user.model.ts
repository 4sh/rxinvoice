import {userRole} from './user-role.type';

export class User {
    _id: string;
    name: string;
    email: string;
    roles: userRole[];
    companyRef: string;

    constructor() {
    }
}
