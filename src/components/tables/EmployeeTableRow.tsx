import { FC, MouseEventHandler } from 'react';
import { IEmployee } from '../../models/employee/employee.model';
import { Stack, TableCell, TableRow } from '@mui/material';
import PrimaryButton from '../common/buttons/PrimaryButton';
import DangerButton from '../common/buttons/DangerButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactNumberUtil from '../../utils/contactNumberUtil';
import ActiveBadge from '../common/badge/ActiveBadge';
import SecondaryButton from '../common/buttons/SecondaryButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppDispatch } from '../../store/index.store';
import { employeeFormSliceActions } from '../../store/employeeFormSlice/employeeForm.slice';

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
    const dispatch = useAppDispatch();

    const { openUpdateEmployeeFormPopup } = employeeFormSliceActions;

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

    const editButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        dispatch(openUpdateEmployeeFormPopup(employee.id));
    };

    return (
        <TableRow>
            <TableCell>{employee.id}</TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.employmentType}</TableCell>
            <TableCell>{employee.role}</TableCell>
            <TableCell>
                {ContactNumberUtil.convertContactNumberToFormettedString(
                    employee.contactNumber,
                )}
            </TableCell>
            <TableCell>
                <ActiveBadge isActive={employee.isActive} />
            </TableCell>
            <TableCell>
                <Stack
                    direction='row'
                    useFlexGap
                    flexWrap='wrap'
                    spacing={1}
                >
                    <PrimaryButton
                        onClickHanlder={viewAvailabilityButtonOnClickHandler}
                        helperText='View Availability'
                    >
                        <VisibilityIcon />
                    </PrimaryButton>

                    <SecondaryButton
                        onClickHanlder={editButtonOnClickHandler}
                        helperText='Edit Employee'
                    >
                        <EditNoteIcon />
                    </SecondaryButton>
                    <DangerButton
                        onClickHanlder={deleteButtonOnClickHandler}
                        helperText='Delete Employee'
                    >
                        <DeleteIcon />
                    </DangerButton>
                </Stack>
            </TableCell>
        </TableRow>
    );
};

export default EmployeeTableRow;
