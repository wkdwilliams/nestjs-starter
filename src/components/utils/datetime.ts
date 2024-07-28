import moment from 'moment-timezone';
import { TimezoneEnum } from '../enum/timezones.enum';

export function ConvertTimeToUTC(time: string, timeZone: TimezoneEnum): moment.Moment {
    return moment.tz(time, "HH:mm:ss", timeZone)
}

export function ConvertDateTimeToUTC(date: string, timeZone: TimezoneEnum): moment.Moment {
    return moment.utc(date).tz(timeZone);
}

export function ConvertDateStringToUTC(time: string, timeZone: TimezoneEnum): moment.Moment {
    return moment.tz(time, "YYYY-MM-DD HH:mm:ss", timeZone);
}