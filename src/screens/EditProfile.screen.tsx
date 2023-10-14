import { FC, useEffect } from 'react';
import { dashboardSliceActions } from '../store/dashboardSlice/dashboard.slice';
import { useAppDispatch, useAppSelector } from '../store/index.store';
import { PageTitle } from '../constants/pageTitle';
import DefaultWeeklyAvailabilityForm from '../components/forms/defaultWeeklyAvailabilityForm/DefaultWeeklyAvailabilityForm';
import { useGetAllAvailableTimeSlotsQuery } from '../store/api/timeSlot.api';
import { QueryStatus } from '@reduxjs/toolkit/query/react';
import { loadingSliceActions } from '../store/loadingSlice/loading.slice';
import ErrorHandler from '../utils/errorHandler';
import { useGetEmployeeDefaultWeeklyTimeSlotsQuery } from '../store/api/employeeTimeSlot.api';

const EditProfile: FC = () => {
    const { token, employeeId } = useAppSelector((state) => state.loginSlice);

    const dispatch = useAppDispatch();

    const { setPageTitle } = dashboardSliceActions;
    const { openLoading, closeLoading } = loadingSliceActions;

    const {
        status: getAllAvailableTimSlotStatus,
        error: getallAvailableTimeSlotError,
    } = useGetAllAvailableTimeSlotsQuery(
        {
            token: token!,
        },
        {
            skip: token === null,
            refetchOnMountOrArgChange: true,
        },
    );

    const {
        status: getEmployeeDefaultWeeklyTimeSlotStatus,
        error: getEmployeeDefaultWeeklyTimeSlotError,
    } = useGetEmployeeDefaultWeeklyTimeSlotsQuery(
        {
            token: token!,
            employeeId: employeeId!,
        },
        {
            skip:
                employeeId === null ||
                Number.isNaN(employeeId) ||
                token === null,
            refetchOnMountOrArgChange: true,
        },
    );

    useEffect(() => {
        dispatch(setPageTitle(PageTitle.EDIT_PROFILE));
    }, [dispatch, setPageTitle]);

    useEffect(() => {
        if (
            getAllAvailableTimSlotStatus === QueryStatus.pending ||
            getEmployeeDefaultWeeklyTimeSlotStatus === QueryStatus.pending
        ) {
            dispatch(openLoading());
        } else {
            dispatch(closeLoading());
        }

        if (
            getAllAvailableTimSlotStatus === QueryStatus.rejected &&
            typeof getallAvailableTimeSlotError !== 'undefined'
        ) {
            ErrorHandler.activeToast(getallAvailableTimeSlotError);
        }

        if (
            getEmployeeDefaultWeeklyTimeSlotStatus === QueryStatus.rejected &&
            typeof getEmployeeDefaultWeeklyTimeSlotStatus !== 'undefined'
        ) {
            ErrorHandler.activeToast(getEmployeeDefaultWeeklyTimeSlotError);
        }
    }, [
        getAllAvailableTimSlotStatus,
        getallAvailableTimeSlotError,
        getEmployeeDefaultWeeklyTimeSlotStatus,
        getEmployeeDefaultWeeklyTimeSlotError,
        dispatch,
        openLoading,
        closeLoading,
    ]);

    return (
        <>
            <DefaultWeeklyAvailabilityForm />
        </>
    );
};

export default EditProfile;
