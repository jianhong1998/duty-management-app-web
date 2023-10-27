import { FC, MouseEventHandler, useEffect } from 'react';
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
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useAppDispatch, useAppSelector } from '../../store/index.store';
import { employeeFormSliceActions } from '../../store/employeeFormSlice/employeeForm.slice';
import {
    useDeactivateEmployeeMutation,
    useReactivateEmployeeMutation,
} from '../../store/employeeSlice/employee.api';
import { QueryStatus } from '@reduxjs/toolkit/query/react';
import ToastifyController from '../../utils/toastifyController';
import ErrorHandler from '../../utils/errorHandler';

interface EmployeeTableRowProps {
    employee: IEmployee;
    openAvailabilityInfoPopupFn: (
        employeeName: string,
        employeeId: number,
        availabilityIds: IEmployee['weeklyAvailabilityTimeSlotIds'],
    ) => void;
}

const EmployeeTableRow: FC<EmployeeTableRowProps> = ({
    employee,
    openAvailabilityInfoPopupFn,
}) => {
    const { token } = useAppSelector((state) => state.loginSlice);

    const dispatch = useAppDispatch();

    const { openUpdateEmployeeFormPopup } = employeeFormSliceActions;

    const [
        deactivateEmployee,
        {
            status: deactivateStatus,
            data: deactivateData,
            error: deactivateError,
            reset: deactivateReset,
        },
    ] = useDeactivateEmployeeMutation();

    const [
        reactivateEmployee,
        {
            status: reactivateStatus,
            data: reactivateData,
            error: reactivateError,
            reset: reactivateReset,
        },
    ] = useReactivateEmployeeMutation();

    const viewAvailabilityButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        openAvailabilityInfoPopupFn(
            employee.name,
            employee.id,
            employee.weeklyAvailabilityTimeSlotIds,
        );
    };

    const deactivateButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        deactivateEmployee({ token: token || '', employeeId: employee.id });
    };

    const editButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        dispatch(openUpdateEmployeeFormPopup(employee.id));
    };

    const reactivateButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        reactivateEmployee({
            token: token || '',
            employeeId: employee.id,
        });
    };

    useEffect(() => {
        if (
            deactivateStatus === QueryStatus.fulfilled &&
            deactivateData?.isSuccess
        ) {
            ToastifyController.activeSuccess(
                `Employee ${employee.name} is deactivated successfully.`,
            );

            deactivateReset();
        }

        if (deactivateStatus === QueryStatus.rejected && deactivateError) {
            ErrorHandler.activeToast(deactivateError);

            deactivateReset();
        }
    }, [
        deactivateData,
        deactivateStatus,
        deactivateError,
        employee.name,
        deactivateReset,
    ]);

    useEffect(() => {
        if (
            reactivateStatus === QueryStatus.fulfilled &&
            reactivateData?.isSuccess
        ) {
            ToastifyController.activeSuccess(
                `Employee ${employee.name} is reactivated successfully.`,
            );

            reactivateReset();
        }

        if (reactivateStatus === QueryStatus.rejected && reactivateError) {
            ErrorHandler.activeToast(reactivateError);

            reactivateReset();
        }
    }, [
        reactivateData,
        reactivateError,
        reactivateStatus,
        employee.name,
        reactivateReset,
    ]);

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
                    {employee.isActive && (
                        <DangerButton
                            onClickHanlder={deactivateButtonOnClickHandler}
                            helperText='Deactivate Employee'
                        >
                            <DeleteIcon />
                        </DangerButton>
                    )}
                    {!employee.isActive && (
                        <PrimaryButton
                            helperText='Reactivate Employee'
                            onClickHanlder={reactivateButtonOnClickHandler}
                        >
                            <PersonAddAltIcon />
                        </PrimaryButton>
                    )}
                </Stack>
            </TableCell>
        </TableRow>
    );
};

export default EmployeeTableRow;
