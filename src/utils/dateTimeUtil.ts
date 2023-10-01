export default class DateTimeUtil {
    static convertDateToString(date: Date): string {
        return date.toLocaleDateString('en-SG');
    }

    static getTimeInDate(date: Date, enable12HoursFormat: boolean): string {
        return date.toLocaleTimeString('en-SG', {
            timeZone: 'Asia/Singapore',
            hour12: enable12HoursFormat,
            timeStyle: 'short'
        });
    }
}
