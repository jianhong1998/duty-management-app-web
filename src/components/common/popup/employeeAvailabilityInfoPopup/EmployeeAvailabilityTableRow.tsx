import { TableRow, TableCell } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import DateTimeUtil from '../../../../utils/dateTimeUtil';

interface EmployeeAvailabilityTableRowProps {
    weekday: string;
    startTime: string | Date;
    endTime: string | Date;
}

const EmployeeAvailabilityTableRow: FC<EmployeeAvailabilityTableRowProps> = ({
    weekday,
    startTime,
    endTime
}) => {
    const [displayStartTime, setDisplayStartTime] = useState<string>('');
    const [displayEndTime, setDisplayEndTime] = useState<string>('');

    useEffect(() => {
        if (startTime instanceof Date) {
            setDisplayStartTime(DateTimeUtil.getTimeInDate(startTime, true));
        } else {
            setDisplayStartTime(startTime);
        }

        if (endTime instanceof Date) {
            setDisplayEndTime(DateTimeUtil.getTimeInDate(endTime, true));
        } else {
            setDisplayEndTime(endTime);
        }
    }, [startTime, endTime]);

    return (
        <TableRow>
            <TableCell>{weekday}</TableCell>
            <TableCell>{displayStartTime}</TableCell>
            <TableCell>{displayEndTime}</TableCell>
        </TableRow>
    );
};

export default EmployeeAvailabilityTableRow;
