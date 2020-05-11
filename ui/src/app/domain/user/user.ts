import {userRole} from './user-role.type';
import {Company} from '../company/company';
import {CompanyRole, CompanyRoleEnum} from './company-role-type';

export class User {
    _id: string;
    name: string;
    email: string;
    roles: userRole[];
    companyRole: CompanyRole;
    companyRef: string;

    public isDirector(): Boolean {
        return this.companyRole === CompanyRoleEnum.DIRECTOR;
    }

    public isInvoicing(): Boolean {
        return this.companyRole  === CompanyRoleEnum.INVOICING;
    }
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
