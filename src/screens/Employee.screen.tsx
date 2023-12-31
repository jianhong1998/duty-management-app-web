import { Box, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/index.store';
import { dashboardSliceActions } from '../store/dashboardSlice/dashboard.slice';
import { PageTitle } from '../constants/pageTitle';
import {
    useDeactivateEmployeeMutation,
    useGetAllEmployeesQuery,
} from '../store/employeeSlice/employee.api';
import ErrorHandler from '../utils/errorHandler';
import { employeeSliceActions } from '../store/employeeSlice/employee.slice';
import { loadingSliceActions } from '../store/loadingSlice/loading.slice';
import EmployeeTable from '../components/tables/employeeTable/EmployeeTable';
import { Color } from '../constants/appTheme';
import UpdateEmployeeFormPopup from '../components/common/popup/employeeFormPopup/UpdateEmployeeFormPopup';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';

const EmployeePage: FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { employees, employeeTable } = useAppSelector(
        (state) => state.employeeSlice,
    );
    const { token } = useAppSelector((state) => state.loginSlice);

    const dispatch = useAppDispatch();

    const { setPageTitle } = dashboardSliceActions;
    const { setEmployees } = employeeSliceActions;
    const { openLoading, closeLoading } = loadingSliceActions;

    const { isError, error, isLoading } = useGetAllEmployeesQuery(
        {
            token: token!,
            pageNumber: employeeTable.paginationModel.page + 1,
            pageSize: employeeTable.paginationModel.pageSize,
            sortBy: employeeTable.sortModel[0]?.field,
            sortOrder: employeeTable.sortModel[0]?.sort?.toUpperCase(),
        },
        {
            skip:
                !token ||
                employeeTable.paginationModel.page <= -1 ||
                employeeTable.paginationModel.page > employeeTable.maxPage,
            pollingInterval: 3000,
            refetchOnMountOrArgChange: true,
        },
    );

    const [_, { status: deactivateEmployeeMutationStatus }] =
        useDeactivateEmployeeMutation({
            fixedCacheKey: 'deactivateEmployeeFromDeactivateButton',
        });

    useEffect(() => {
        if (
            isLoading ||
            deactivateEmployeeMutationStatus === QueryStatus.pending
        ) {
            dispatch(openLoading());
        } else {
            dispatch(closeLoading());
        }
    }, [
        isLoading,
        deactivateEmployeeMutationStatus,
        dispatch,
        openLoading,
        closeLoading,
    ]);

    useEffect(() => {
        dispatch(setPageTitle(PageTitle.EMPLOYEE));
    }, [dispatch, setPageTitle]);

    useEffect(() => {
        if (isError) {
            dispatch(setEmployees([]));

            if (ErrorHandler.isFetchBaseQueryError(error)) {
                switch (error.status) {
                    case 'FETCH_ERROR':
                        setErrorMessage(error.error);
                        return;
                    case 'TIMEOUT_ERROR':
                    case 'PARSING_ERROR':
                    case 'CUSTOM_ERROR':
                        setErrorMessage(error.error);
                        ErrorHandler.activeToast(error);
                        return;
                    default:
                        return;
                }
            }

            if (ErrorHandler.isSerializedError(error)) {
                setErrorMessage(error.message || null);
                ErrorHandler.activeToast(error);
                return;
            }
        }

        setErrorMessage(null);
    }, [isError, error, dispatch, setEmployees]);

    return (
        <>
            <Box
                sx={{
                    backgroundColor: Color.white,
                    paddingX: 5,
                    paddingY: 2,
                    borderRadius: 4,
                    boxShadow: 5,
                }}
            >
                {errorMessage !== null && (
                    <Typography>{errorMessage}</Typography>
                )}
                {errorMessage === null && employees.length > 0 && (
                    <EmployeeTable employees={employees} />
                )}
            </Box>
            <UpdateEmployeeFormPopup />
        </>
    );
};

export default EmployeePage;
