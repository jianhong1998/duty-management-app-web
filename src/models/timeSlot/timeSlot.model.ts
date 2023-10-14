import Prettify from '../prettifyType/prettifyType';

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

export type ISimplifiedTimeSlotResponse = Prettify<
    Pick<ResponseTimeSlot, 'id' | 'startTime' | 'endTime'>
>;

export interface IGetTimeSlotResponse
    extends Pick<ITimeSlot, 'id' | 'isDeleted'> {
    startTime: string;
    endTime: string;
    isAvailableFor: {
        mon: boolean;
        tue: boolean;
        wed: boolean;
        thu: boolean;
        fri: boolean;
        sat: boolean;
        sun: boolean;
    };
}

export interface IGetTimeSlotRequestConfig {
    timeSlotId: number;
    token: string;
}
