import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {User} from '../../../../../../domain/user/user';
import {UserService} from '../../../../../../common/services/user.service';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AUserSelectComponent),
    multi: true
};

@Component({
    selector: 'a-user-select',
    templateUrl: './a-user-select.component.html',
    styleUrls: ['./a-user-select.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class AUserSelectComponent implements OnInit, ControlValueAccessor {

    public users: Array<User> = [];
    public user: User;
    public disabled: boolean;

    private userRef: string;
    private onNgChange: (userRef: string) => void;
    private onNgTouched: () => void;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userService.fetchUsers().subscribe(users => {
            this.users = users;
            this.writeValue(this.userRef);
        });
    }

    registerOnChange(fn: any): void {
        this.onNgChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onNgTouched = fn;
    }

    writeValue(userRef: string): void {
        this.userRef = userRef;
        if (userRef) {
            this.user = this.findByVATRate(userRef);
        } else {
            this.user = null;
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onChange(user: User): void {
        this.user = user;
        this.userRef = user._id;
        this.onNgChange(user._id);
    }

    private findByVATRate(userRef: string): User {
        return this.users.find(user => user._id === userRef);
    }
}
