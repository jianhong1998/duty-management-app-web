export default interface ITimeSlot {
    id: number;
    startTime: Date;
    endTime: Date;
    isDeleted: boolean;
    isAvailableForMon: boolean;
    isAvailableForTue: boolean;
    isAvailableForWed: boolean;
    isAvailableForThu: boolean;
    isAvailableForFri: boolean;
    isAvailableForSat: boolean;
    isAvailableForSun: boolean;
}

export interface ResponseTimeSlot
    extends Omit<ITimeSlot, 'startTime' | 'endTime'> {
    startTime: string;
    endTime: string;
}

export interface IGetTimeSlotRequestConfig {
    timeSlotId: number;
    token: string;
}
