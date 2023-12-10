import { FC, MouseEventHandler, useEffect } from 'react';
import PrimaryButton from '../../../common/buttons/PrimaryButton';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useReactivateEmployeeMutation } from '../../../../store/employeeSlice/employee.api';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import ErrorHandler from '../../../../utils/errorHandler';
import ToastifyController from '../../../../utils/toastifyController';

interface ReactivateEmployeeButtonProps {
    employeeId: number;
    employeeName: string;
}

const ReactivateEmployeeButton: FC<ReactivateEmployeeButtonProps> = ({
    employeeId,
    employeeName,
}) => {
    const [
        reactivateEmployee,
        {
            status: reactivateStatus,
            data: reactivateData,
            error: reactivateError,
            reset: reactivateReset,
        },
    ] = useReactivateEmployeeMutation();

    const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
        reactivateEmployee({
            employeeId: employeeId,
        });
    };

    useEffect(() => {
        if (
            reactivateStatus === QueryStatus.fulfilled &&
            reactivateData?.isSuccess
        ) {
            ToastifyController.activeSuccess(
                `Employee ${employeeName} is reactivated successfully.`,
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
        employeeName,
        reactivateReset,
    ]);

    return (
        <PrimaryButton
            helperText='Reactivate Employee'
            onClickHanlder={onClickHandler}
        >
            <PersonAddAltIcon />
        </PrimaryButton>
    );
};

export default ReactivateEmployeeButton;
