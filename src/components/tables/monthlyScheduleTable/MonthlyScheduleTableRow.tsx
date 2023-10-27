import { FC, ReactNode } from 'react';
import {
    IMonthInfo,
    IMonthlyScheduleTableRowData,
    IScheduleShortInfo,
} from '../../../models/monthlyDutySchedule/monthlyDutySchedule.model';
import { TableCell, TableRow } from '@mui/material';
import { Color } from '../../../constants/appTheme';

interface MonthlyScheduleTableRowProps {
    dutySchedule: IMonthlyScheduleTableRowData;
    monthInfo: IMonthInfo;
}

const MonthlyScheduleTableRow: FC<MonthlyScheduleTableRowProps> = ({
    dutySchedule,
    monthInfo,
}) => {
    const map = new Map<number, IScheduleShortInfo>(
        dutySchedule.monthlyDutySchedules.map((schedule) => [
            schedule.date,
            schedule,
        ]),
    );

    const generateTableCell = (totalDays: number): ReactNode[] => {
        const tableCellArray: ReactNode[] = [];

        for (let date = 1; date <= totalDays; date++) {
            if (map.has(date)) {
                const scheduleInfo = map.get(date);

                tableCellArray.push(
                    <TableCell
                        key={date}
                        sx={{
                            backgroundColor: scheduleInfo?.backgroundColor,
                            textAlign: 'center',
                        }}
                    >{`${scheduleInfo?.startTime} - ${scheduleInfo?.endTime}`}</TableCell>,
                );
            } else {
                tableCellArray.push(
                    <TableCell
                        key={date}
                        sx={{
                            backgroundColor: Color.grey,
                            textAlign: 'center',
                        }}
                    >
                        -
                    </TableCell>,
                );
            }
        }

        return tableCellArray;
    };

    return (
        <TableRow>
            <TableCell>{dutySchedule.employeeName}</TableCell>
            <TableCell>{dutySchedule.role}</TableCell>
            {generateTableCell(monthInfo.totalDays)}
        </TableRow>
    );
};

export default MonthlyScheduleTableRow;
