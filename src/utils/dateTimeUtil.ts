import moment from 'moment';

export default class DateTimeUtil {
    static convertDateToString(date: Date): string {
        return moment(date.toISOString()).format('DD-MM-YYYY');
    }

    static getTimeInDate(date: Date, enable12HoursFormat: boolean): string {
        return date.toLocaleTimeString('en-SG', {
            timeZone: 'Asia/Singapore',
            hour12: enable12HoursFormat,
            timeStyle: 'short',
        });
    }

    static convertTimeStringTo12HourFormat(time: string): string {
        return moment(time, 'HH:mm').format('hh:mma');
    }

    static generateDateObject({
        date,
        month,
        year,
    }: {
        date: number;
        month: number;
        year: number;
    }): Date {
        const dateInString = date.toString().padStart(2, '0');
        const monthInStirng = month.toString().padStart(2, '0');

        return new Date(`${year}-${monthInStirng}-${dateInString}`);
    }
}
