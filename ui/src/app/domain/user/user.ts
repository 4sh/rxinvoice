import {userRole} from './user-role.type';
import {Company} from '../company/company';

export class User {
    _id: string;
    name: string;
    email: string;
    roles: userRole[];
    companyRef: string;
}

export class ConnectedUser extends User {
    company?: Company;

    constructor(user: User, company: Company) {
        super();
        this._id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.roles = user.roles;
        this.companyRef = user.companyRef;
        this.company = company;
    }

}
