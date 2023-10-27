import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/index.store';
import { dashboardSliceActions } from '../store/dashboardSlice/dashboard.slice';
import { PageTitle } from '../constants/pageTitle';
import { useUserGetMonthlyDutyScheduleByMonthQuery } from '../store/monthlyScheduleSice/userMonthlySchedule.api';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import ErrorHandler from '../utils/errorHandler';
import { loadingSliceActions } from '../store/loadingSlice/loading.slice';
import { SelectChangeEvent, Stack, Typography } from '@mui/material';
import { Color } from '../constants/appTheme';
import MonthlyScheduleTable from '../components/tables/monthlyScheduleTable/MonthlyScheduleTable';
import UserSearchMonthlyScheduleForm from '../components/forms/monthlyScheduleForms/userSearchMonthlyScheduleForm/UserSearchMonthlyScheduleForm';
import { monthlyScheduleSliceActions } from '../store/monthlyScheduleSice/monthlySchedule.slice';

const HomePage: FC = () => {
    const { token, username } = useAppSelector((state) => state.loginSlice);
    const { monthlyDutySchedules } = useAppSelector(
        (state) => state.monthlyScheduleSlice.records,
    );
    const { month, year } = useAppSelector(
        (state) => state.monthlyScheduleSlice.homeOptions,
    );

    const dispatch = useAppDispatch();

    const { setPageTitle } = dashboardSliceActions;
    const { openLoading, closeLoading } = loadingSliceActions;
    const { setHomeOptions } = monthlyScheduleSliceActions;

    const { status, error } = useUserGetMonthlyDutyScheduleByMonthQuery(
        {
            token: token!,
            year,
            month,
        },
        {
            skip: !token,
            pollingInterval: 5000,
            refetchOnMountOrArgChange: true,
        },
    );

    const monthOnChangeHandler = (event: SelectChangeEvent) => {
        const value = Number.parseInt(event.target.value);

        if (Number.isNaN(value)) {
            ErrorHandler.activeToast(new Error('Month is invalid.'));

            return;
        }

        dispatch(
            setHomeOptions({
                month: value,
                year,
            }),
        );
    };

    const yearOnChangeHandler = (event: SelectChangeEvent) => {
        const value = Number.parseInt(event.target.value);

        if (Number.isNaN(value)) {
            ErrorHandler.activeToast(new Error('Year is invalid.'));

            return;
        }

        dispatch(
            setHomeOptions({
                month,
                year: value,
            }),
        );
    };

    useEffect(() => {
        dispatch(setPageTitle(PageTitle.HOME));
    }, [dispatch, setPageTitle]);

    useEffect(() => {
        if (status === QueryStatus.rejected && error) {
            if (
                ErrorHandler.isFetchBaseQueryError(error) &&
                error.status === 404
            ) {
                return;
            }

            ErrorHandler.activeToast(error);
        }
    }, [status, error]);

    useEffect(() => {
        const loadingCondition = status === QueryStatus.pending;

        if (loadingCondition) {
            dispatch(openLoading());
        } else {
            dispatch(closeLoading());
        }
    }, [status, dispatch, openLoading, closeLoading]);

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
            <Typography variant='h5'>
                Hi {username}, welcome to DutySimple
            </Typography>
            <UserSearchMonthlyScheduleForm
                monthOnChangeHandler={monthOnChangeHandler}
                yearOnChangeHandler={yearOnChangeHandler}
                month={month}
                year={year}
            />
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

export default HomePage;
