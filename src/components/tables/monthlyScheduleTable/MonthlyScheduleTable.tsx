import { FC, ReactNode } from 'react';
import { useAppSelector } from '../../../store/index.store';
import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import MonthlyScheduleTableRow from './MonthlyScheduleTableRow';
import MonthlyDutyScheduleTableUtil from '../../../utils/monthlyDutySchedule/monthlyDutyScheduleTableUtil';
import { IMonthInfo } from '../../../models/monthlyDutySchedule/monthlyDutySchedule.model';
import moment from 'moment';
import DateTimeUtil from '../../../utils/dateTimeUtil';
import ConfirmBadge from '../../common/badge/ConfirmBadge';

const MonthlyScheduleTable: FC = () => {
    const { employees, monthlyDutySchedules, timeSlots, monthInfo } =
        useAppSelector((state) => state.monthlyScheduleSlice.records);
    const { isRecordConfirmed } = useAppSelector(
        (state) => state.monthlyScheduleSlice,
    );

    const tableDataArray =
        MonthlyDutyScheduleTableUtil.convertDataToTableRowData({
            employees,
            timeSlots,
            monthlyDutyScheduleArray: monthlyDutySchedules,
        });

    const getDateHeader = (totalDays: number): ReactNode[] => {
        const tableCells: ReactNode[] = [];

        for (let count = 1; count <= totalDays; count++) {
            tableCells.push(
                <TableCell
                    key={count}
                    sx={{ textAlign: 'center', fontWeight: 'bold' }}
                >
                    {count}
                </TableCell>,
            );
        }

        return tableCells;
    };

    const getWeekdayHeader = (monthInfo: IMonthInfo): ReactNode[] => {
        const tableCellArray: ReactNode[] = [];

        for (
            let dateNumber = 1;
            dateNumber <= monthInfo?.totalDays;
            dateNumber++
        ) {
            const momentDate = moment(
                DateTimeUtil.generateDateObject({
                    date: dateNumber,
                    month: monthInfo.month,
                    year: monthInfo.year,
                }).toISOString(),
            );

            tableCellArray.push(
                <TableCell
                    key={dateNumber}
                    sx={{ textAlign: 'center', fontWeight: 'bold' }}
                >
                    {momentDate.format('ddd')}
                </TableCell>,
            );
        }

        return tableCellArray;
    };

    return (
        <TableContainer component={Box}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell
                            colSpan={2}
                            sx={{ fontWeight: 'bold' }}
                        >
                            Employee
                        </TableCell>
                        <TableCell
                            colSpan={monthInfo?.totalDays}
                            sx={{ fontWeight: 'bold' }}
                        >
                            <Stack
                                direction={'row'}
                                gap={2}
                            >
                                Dates
                                <Box width={150}>
                                    <ConfirmBadge
                                        isConfirmed={isRecordConfirmed || false}
                                    />
                                </Box>
                            </Stack>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell
                            sx={{ fontWeight: 'bold' }}
                            rowSpan={2}
                        >
                            Name
                        </TableCell>
                        <TableCell
                            sx={{ fontWeight: 'bold' }}
                            rowSpan={2}
                        >
                            Role
                        </TableCell>
                        {getDateHeader(monthInfo?.totalDays || 0)}
                    </TableRow>
                    <TableRow>{getWeekdayHeader(monthInfo!)}</TableRow>
                </TableHead>
                <TableBody>
                    {tableDataArray.map((tableData) => (
                        <MonthlyScheduleTableRow
                            key={tableData.employeeName}
                            dutySchedule={tableData}
                            monthInfo={monthInfo!}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MonthlyScheduleTable;
