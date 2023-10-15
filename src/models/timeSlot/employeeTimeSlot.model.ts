import { ISimplifiedTimeSlotResponse } from './timeSlot.model';

export interface IEmployeeDefaultWeeklyTimeSlots {
    mon: ISimplifiedTimeSlotResponse | null;
    tue: ISimplifiedTimeSlotResponse | null;
    wed: ISimplifiedTimeSlotResponse | null;
    thu: ISimplifiedTimeSlotResponse | null;
    fri: ISimplifiedTimeSlotResponse | null;
    sat: ISimplifiedTimeSlotResponse | null;
    sun: ISimplifiedTimeSlotResponse | null;
}

export interface IGetEmployeeDefaultWeeklyTimeSlotsRequestConfig {
    token: string;
    employeeId: number;
}

export interface IPutEmployeeDefaultWeeklyTimeSlotsRequestConfig
    extends IGetEmployeeDefaultWeeklyTimeSlotsRequestConfig {
    weeklyTimeSlotIds: {
        mon: number | null;
        tue: number | null;
        wed: number | null;
        thu: number | null;
        fri: number | null;
        sat: number | null;
        sun: number | null;
    };
}
