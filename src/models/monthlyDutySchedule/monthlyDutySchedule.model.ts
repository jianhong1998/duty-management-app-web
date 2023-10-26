import { EmployeeRole, IEmployee } from '../employee/employee.model';
import { ResponseTimeSlot } from '../timeSlot/timeSlot.model';

export interface IMonthlyDutySchedule {
    date: Date;
    employeeId: number;
    timeSlotId: number;
    isConfirmed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IMonthInfo {
    month: number;
    year: number;
    totalDays: number;
}

export interface IMonthlyDutyScheduleResponse {
    monthInfo: IMonthInfo;
    employees: IEmployee[];
    monthlyDutySchedules: IMonthlyDutySchedule[];
    timeSlots: ResponseTimeSlot[];
}

export interface IGetMonthlyDutyScheduleByIdRequest {
    token: string;
    month: number;
    year: number;
}

export interface IScheduleShortInfo {
    date: number;
    startTime: string;
    endTime: string;
    backgroundColor?: string;
}

export interface IMonthlyScheduleTableRowData {
    employeeName: string;
    role: EmployeeRole;
    monthlyDutySchedules: IScheduleShortInfo[];
}
