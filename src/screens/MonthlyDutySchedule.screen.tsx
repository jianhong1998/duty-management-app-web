import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/index.store';
import { dashboardSliceActions } from '../store/dashboardSlice/dashboard.slice';
import { PageTitle } from '../constants/pageTitle';
import SearchMonthlyScheduleForm from '../components/forms/monthlyScheduleForms/SearchMonthlyScheduleForm';
import { Stack } from '@mui/material';
import { Color } from '../constants/appTheme';
import { useGetMonthlyDutySchedulesByMonthQuery } from '../store/monthlyScheduleSice/monthlySchedule.api';
import { loadingSliceActions } from '../store/loadingSlice/loading.slice';
import { QueryStatus } from '@reduxjs/toolkit/query/react';
import ErrorHandler from '../utils/errorHandler';
import MonthlyScheduleTable from '../components/tables/monthlyScheduleTable/MonthlyScheduleTable';

const MonthlyDutySchedulePage: FC = () => {
    const { token } = useAppSelector((state) => state.loginSlice);
    const { month, year } = useAppSelector(
        (state) => state.monthlyScheduleSlice.options,
    );
    const { monthlyDutySchedules } = useAppSelector(
        (state) => state.monthlyScheduleSlice.records,
    );

    const dispatch = useAppDispatch();

    const { setPageTitle } = dashboardSliceActions;
    const { closeLoading, openLoading } = loadingSliceActions;

    const {
        error: getMonthlyDutyScheduleError,
        status: getMonthlyDutyScheduleStatus,
    } = useGetMonthlyDutySchedulesByMonthQuery(
        {
            token: token!,
            month: month!,
            year: year!,
        },
        {
            skip: !token || !month || !year,
            refetchOnMountOrArgChange: true,
        },
    );

    useEffect(() => {
        dispatch(setPageTitle(PageTitle.MONTHLY_DUTY_SCHEDULE));
    }, [dispatch, setPageTitle]);

    useEffect(() => {
        const loadingCondition =
            getMonthlyDutyScheduleStatus === QueryStatus.pending;

        if (loadingCondition) {
            dispatch(openLoading());
        } else {
            dispatch(closeLoading());
        }
    }, [getMonthlyDutyScheduleStatus, dispatch, openLoading, closeLoading]);

    useEffect(() => {
        if (
            getMonthlyDutyScheduleError &&
            ErrorHandler.isFetchBaseQueryError(getMonthlyDutyScheduleError) &&
            getMonthlyDutyScheduleError.status !== 404
        ) {
            ErrorHandler.activeToast(getMonthlyDutyScheduleError);
        }
    }, [getMonthlyDutyScheduleError]);

    return (
        <Stack
            sx={{
                backgroundColor: Color.white,
                paddingX: 5,
                paddingY: 2,
                borderRadius: 4,
                boxShadow: 5,
            }}
            spacing={2}
        >
            <SearchMonthlyScheduleForm />
            {monthlyDutySchedules.length > 0 && <MonthlyScheduleTable />}
            {monthlyDutySchedules.length === 0 && (
                <Stack
                    sx={{ backgroundColor: Color.grey }}
                    justifyContent={'center'}
                    alignItems={'center'}
                    height={500}
                    borderRadius={4}
                >
                    No Schedule Generated
                </Stack>
            )}
        </Stack>
    );
};

export default MonthlyDutySchedulePage;
