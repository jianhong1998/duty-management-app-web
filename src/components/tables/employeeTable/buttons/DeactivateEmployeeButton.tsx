import { FC, MouseEventHandler, useEffect } from 'react';
import DangerButton from '../../../common/buttons/DangerButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeactivateEmployeeMutation } from '../../../../store/employeeSlice/employee.api';
import { QueryStatus } from '@reduxjs/toolkit/dist/query/react';
import ToastifyController from '../../../../utils/toastifyController';
import ErrorHandler from '../../../../utils/errorHandler';

interface DeactivateButtonProps {
    employeeName: string;
    employeeId: number;
}

const DeactivateEmployeeButton: FC<DeactivateButtonProps> = ({
    employeeId,
    employeeName,
}) => {
    const [
        deactivateEmployee,
        {
            status: deactivateStatus,
            data: deactivateData,
            error: deactivateError,
            reset: deactivateReset,
        },
    ] = useDeactivateEmployeeMutation();

    const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
        deactivateEmployee({ employeeId });
    };

    useEffect(() => {
        if (
            deactivateStatus === QueryStatus.fulfilled &&
            deactivateData?.isSuccess
        ) {
            ToastifyController.activeSuccess(
                `Employee ${employeeName} is deactivated successfully.`,
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
        employeeName,
        deactivateReset,
    ]);

    return (
        <DangerButton
            onClickHanlder={onClickHandler}
            helperText='Deactivate Employee'
        >
            <DeleteIcon />
        </DangerButton>
    );
};

export default DeactivateEmployeeButton;
