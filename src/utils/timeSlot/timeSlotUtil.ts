import { SelectionOption } from '../../components/common/input/SelectionInput';
import { ISimplifiedTimeSlotResponse } from '../../models/timeSlot/timeSlot.model';

export default class TimeSlotUtil {
    static convertTimeSlotsToSelectionOptions(
        timeSlots: ISimplifiedTimeSlotResponse[],
    ): SelectionOption[] {
        const result = timeSlots.map((timeSlot) => ({
            label: `${timeSlot.startTime} - ${timeSlot.endTime}`,
            value: timeSlot.id.toString(),
        }));

        return result;
    }
}
