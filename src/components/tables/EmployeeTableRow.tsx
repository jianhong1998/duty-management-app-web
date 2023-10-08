import { FC, MouseEventHandler } from 'react';
import { IEmployee } from '../../models/employee/employee.model';
import { TableCell, TableRow } from '@mui/material';
import PrimaryButton from '../common/buttons/PrimaryButton';
import DangerButton from '../common/buttons/DangerButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactNumberUtil from '../../utils/contactNumberUtil';
import ActiveBadge from '../common/badge/ActiveBadge';

interface EmployeeTableRowProps {
    employee: IEmployee;
    openAvailabilityInfoPopupFn: (
        employeeName: string,
        availabilityIds: IEmployee['weeklyAvailabilityTimeSlotIds'],
    ) => void;
}

const EmployeeTableRow: FC<EmployeeTableRowProps> = ({
    employee,
    openAvailabilityInfoPopupFn,
}) => {
    const viewAvailabilityButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        openAvailabilityInfoPopupFn(
            employee.name,
            employee.weeklyAvailabilityTimeSlotIds,
        );
    };

    const deleteButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {};

    return (
        <TableRow>
            <TableCell>{employee.id}</TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.employmentType}</TableCell>
            <TableCell>{employee.role}</TableCell>
            <TableCell>
                {ContactNumberUtil.convertContactNumberToString(
                    employee.contactNumber,
                )}
            </TableCell>
            <TableCell>
                <ActiveBadge isActive={employee.isActive} />
            </TableCell>
            <TableCell>
                <PrimaryButton
                    onClickHanlder={viewAvailabilityButtonOnClickHandler}
                    style={{ marginRight: 1 }}
                >
                    View Availability
                </PrimaryButton>
                <DangerButton onClickHanlder={deleteButtonOnClickHandler}>
                    <DeleteIcon />
                </DangerButton>
            </TableCell>
        </TableRow>
    );
};

export default EmployeeTableRow;
