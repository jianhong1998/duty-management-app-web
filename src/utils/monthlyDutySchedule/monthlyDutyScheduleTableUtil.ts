import moment from 'moment';
import { EmployeeRole, IEmployee } from '../../models/employee/employee.model';
import {
    IMonthlyDutySchedule,
    IMonthlyScheduleTableRowData,
} from '../../models/monthlyDutySchedule/monthlyDutySchedule.model';
import { ResponseTimeSlot } from '../../models/timeSlot/timeSlot.model';
import EmployeeMapUtil from '../employee/EmployeeMapUtil';
import { Color } from '../../constants/appTheme';

export default class MonthlyDutyScheduleTableUtil {
    static convertDataToTableRowData(params: {
        monthlyDutyScheduleArray: IMonthlyDutySchedule[];
        employees: IEmployee[];
        timeSlots: ResponseTimeSlot[];
    }): IMonthlyScheduleTableRowData[] {
        const { employees, monthlyDutyScheduleArray, timeSlots } = params;

        const employeeIdMap = new EmployeeMapUtil(employees);
        const timeSlotMap = new Map<number, ResponseTimeSlot>(
            timeSlots.map((timeSlot) => [timeSlot.id, timeSlot]),
        );
        const timeSlotColorMap = this.getColorCodeForTimeSlot(timeSlots);

        const employeeDutyScheduleMap =
            this.convertMonthlyDutyScheduleArrayToMapByEmployeeId(
                monthlyDutyScheduleArray,
            );

        const tableRowDataArray: IMonthlyScheduleTableRowData[] = [];

        employeeDutyScheduleMap.forEach(
            (monthlyDutyScheduleArray, employeeId) => {
                const employee = employeeIdMap.employeeIdMap.get(employeeId);

                const tableRowData: IMonthlyScheduleTableRowData = {
                    employeeName: employee?.name || '',
                    role: employee!.role,
                    monthlyDutySchedules: monthlyDutyScheduleArray.map(
                        (schedule) => {
                            const timeSlot = timeSlotMap.get(
                                schedule.timeSlotId,
                            );

                            const date = moment(schedule.date).date();

                            const startTime = timeSlot
                                ? moment(timeSlot.startTime).format('hh:mmA')
                                : '';

                            const endTime = timeSlot
                                ? moment(timeSlot.endTime).format('hh:mmA')
                                : '';

                            return {
                                date,
                                startTime,
                                endTime,
                                backgroundColor: timeSlotColorMap.get(
                                    timeSlot?.id || 0,
                                ),
                            };
                        },
                    ),
                };

                tableRowDataArray.push(tableRowData);
            },
        );

        return tableRowDataArray.sort((a, b) => {
            const roles = [
                EmployeeRole.LEAD,
                EmployeeRole.MID,
                EmployeeRole.JUNIOR,
            ];

            if (roles.indexOf(a.role) < roles.indexOf(b.role)) {
                return -1;
            } else if (a.role === b.role && a.employeeName < b.employeeName) {
                return -1;
            } else {
                return 1;
            }
        });
    }

    private static convertMonthlyDutyScheduleArrayToMapByEmployeeId(
        monthlyDutyScheduleArray: IMonthlyDutySchedule[],
    ): Map<IEmployee['id'], IMonthlyDutySchedule[]> {
        const map = new Map<number, IMonthlyDutySchedule[]>();

        monthlyDutyScheduleArray.forEach((dutySchedule) => {
            if (map.has(dutySchedule.employeeId)) {
                map.get(dutySchedule.employeeId)?.push(dutySchedule);
            } else {
                map.set(dutySchedule.employeeId, [dutySchedule]);
            }
        });

        return map;
    }

    private static getColorCodeForTimeSlot(
        timeSlots: ResponseTimeSlot[],
    ): Map<number, string> {
        const colors = Object.values(Color.blue);

        const timeSlotArray = [...timeSlots];

        return new Map(
            timeSlotArray
                .sort((a, b) => {
                    const momentA = moment(a.startTime);
                    const momentB = moment(b.startTime);

                    return momentA.isBefore(momentB) ? 1 : -1;
                })
                .map((timeSlot, index) => {
                    const color = colors[index];

                    return [timeSlot.id, color];
                }),
        );
    }
}
