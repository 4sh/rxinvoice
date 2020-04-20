import { Injectable } from '@angular/core';
import {ActivityType} from './activity-type.type';
import {UserInfo} from '../user/user-info';

@Injectable()
export class Activity {
    key: string;
    objectType: string;
    objectKey: string;
    objectBusinessKey: string;
    type: ActivityType;
    userInfo: UserInfo;
    timestamp: Date;

  constructor() { }

}


