import ITimeSlot from '../../models/timeSlot/timeSlot.model';

export default class TimeSlotMapUtil {
    public timeSlotMapIdMap: Map<ITimeSlot['id'], ITimeSlot>;

    constructor(timeSlots: ITimeSlot[]) {
        this.timeSlotMapIdMap = new Map(
            timeSlots.map((timeSlot) => [timeSlot.id, timeSlot]),
        );
    }
}
