export enum WeekDay {
    MON = 'mon',
    TUE = 'tue',
    WED = 'wed',
    THU = 'thu',
    FRI = 'fri',
    SAT = 'sat',
    SUN = 'sun',
}

const weekDayMap = new Map<string, string>();

weekDayMap.set('mon', 'Monday');
weekDayMap.set('tue', 'Tuesday');
weekDayMap.set('wed', 'Wednesday');
weekDayMap.set('thu', 'Thusday');
weekDayMap.set('fri', 'Friday');
weekDayMap.set('sat', 'Saturday');
weekDayMap.set('sun', 'Sunday');

export default weekDayMap;
