import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SliceName from '../sliceName';
import { IEmployee } from '../../models/employee/employee.model';
import {
    IMonthInfo,
    IMonthlyDutySchedule,
} from '../../models/monthlyDutySchedule/monthlyDutySchedule.model';
import monthlyScheduleApi from './monthlySchedule.api';
import { ResponseTimeSlot } from '../../models/timeSlot/timeSlot.model';

interface MonthlyScheduleState {
    options: {
        month: number | null;
        year: number | null;
    };
    records: {
        monthInfo: IMonthInfo | null;
        employees: IEmployee[];
        timeSlots: ResponseTimeSlot[];
        monthlyDutySchedules: IMonthlyDutySchedule[];
    };
    isRecordConfirmed: boolean | null;
}

const initialState: MonthlyScheduleState = {
    options: {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    },
    records: {
        monthInfo: null,
        employees: [],
        monthlyDutySchedules: [],
        timeSlots: [],
    },
    isRecordConfirmed: null,
};
const setOptions = (
    state: MonthlyScheduleState,
    action: PayloadAction<MonthlyScheduleState['options']>,
) => {
    state.options = action.payload;
};

const clearRecords = (state: MonthlyScheduleState) => {
    state.records = {
        monthInfo: null,
        employees: [],
        monthlyDutySchedules: [],
        timeSlots: [],
    };

    state.isRecordConfirmed = null;
};

const clearOptions = (state: MonthlyScheduleState) => {
    state.options = {
        month: null,
        year: null,
    };
};

const monthlyScheduleSlice = createSlice({
    name: SliceName.MONTHLY_SCHEDULE,
    initialState,
    reducers: { setOptions, clearOptions, clearRecords },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                monthlyScheduleApi.endpoints.getMonthlyDutySchedulesByMonth
                    .matchFulfilled,
                (state, action) => {
                    if (action.payload.isSuccess) {
                        state.records = action.payload.data;

                        let isConfirmed = true;

                        action.payload.data.monthlyDutySchedules.forEach(
                            (dutySchedule) => {
                                if (!dutySchedule.isConfirmed) {
                                    isConfirmed = false;
                                }
                            },
                        );

                        state.isRecordConfirmed = isConfirmed;
                    }
                },
            )
            .addMatcher(
                monthlyScheduleApi.endpoints.getMonthlyDutySchedulesByMonth
                    .matchRejected,
                (state) => {
                    state.records = {
                        monthInfo: null,
                        employees: [],
                        monthlyDutySchedules: [],
                        timeSlots: [],
                    };
                    state.isRecordConfirmed = null;
                },
            )
            .addMatcher(
                monthlyScheduleApi.endpoints.deleteMonthlyDutySchedulesByMonth
                    .matchFulfilled,
                (state) => {
                    state.records = {
                        monthInfo: null,
                        employees: [],
                        monthlyDutySchedules: [],
                        timeSlots: [],
                    };
                    state.isRecordConfirmed = null;
                },
            )
            .addMatcher(
                monthlyScheduleApi.endpoints.postMonthlyDutyScheduleByMonth
                    .matchFulfilled,
                (state, action) => {
                    if (action.payload.isSuccess) {
                        state.records = action.payload.data;

                        let isConfirmed = true;

                        action.payload.data.monthlyDutySchedules.forEach(
                            (dutySchedule) => {
                                if (!dutySchedule.isConfirmed) {
                                    isConfirmed = false;
                                }
                            },
                        );

                        state.isRecordConfirmed = isConfirmed;
                    }
                },
            )
            .addMatcher(
                monthlyScheduleApi.endpoints.confirmMonthlyDutyScheduleByMonth
                    .matchFulfilled,
                (state, action) => {
                    if (action.payload.isSuccess) {
                        state.records = action.payload.data;

                        let isConfirmed = true;

                        action.payload.data.monthlyDutySchedules.forEach(
                            (dutySchedule) => {
                                if (!dutySchedule.isConfirmed) {
                                    isConfirmed = false;
                                }
                            },
                        );

                        state.isRecordConfirmed = isConfirmed;
                    }
                },
            );
    },
});

export const monthlyScheduleSliceReducer = monthlyScheduleSlice.reducer;
export const monthlyScheduleSliceActions = monthlyScheduleSlice.actions;

export default monthlyScheduleSlice;
