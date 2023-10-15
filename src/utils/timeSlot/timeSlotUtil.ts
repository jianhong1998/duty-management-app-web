import { SelectionOption } from '../../components/common/input/SelectionInput';
import { ISimplifiedTimeSlotResponse } from '../../models/timeSlot/timeSlot.model';
import DateTimeUtil from '../dateTimeUtil';

export default class TimeSlotUtil {
    static convertTimeSlotsToSelectionOptions(
        timeSlots: ISimplifiedTimeSlotResponse[],
    ): SelectionOption[] {
        const result = timeSlots.map((timeSlot) => {
            const value = timeSlot.id.toString();

            const startTime = new Date(
                `2023-01-01T${timeSlot.startTime}+08:00`,
            );
            const endTime = new Date(`2023-01-01T${timeSlot.endTime}+08:00`);

            if (
                Number.isNaN(startTime.getTime()) ||
                Number.isNaN(endTime.getTime())
            ) {
                return {
                    label: `${timeSlot.startTime} - ${timeSlot.endTime}`,
                    value,
                };
            }

            const startTimeString = DateTimeUtil.getTimeInDate(startTime, true);
            const endTimeString = DateTimeUtil.getTimeInDate(endTime, true);

            return {
                label: `${startTimeString} - ${endTimeString}`,
                value,
            };
        });

        return result;
    }
}
