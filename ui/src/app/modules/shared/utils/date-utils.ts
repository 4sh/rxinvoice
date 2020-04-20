import * as moment from 'moment';

export class DateUtils {

    public static stringToDate(date : string | Date) {
        if (typeof date === "string") {
            return moment(date).toDate();
        } else {
            return date;
        }
    }

    public static dateToString(date : string | Date) {
        if (date instanceof Date) {
            return moment(date).format('YYYY-MM-DD');
        } else {
            return date;
        }
    }

}