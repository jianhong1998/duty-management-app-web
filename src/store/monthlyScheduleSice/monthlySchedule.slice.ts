import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SliceName from '../sliceName';
import { IEmployee } from '../../models/employee/employee.model';
import {
    IMonthInfo,
    IMonthlyDutySchedule,
} from '../../models/monthlyDutySchedule/monthlyDutySchedule.model';
import monthlyScheduleApi from './monthlySchedule.api';
import { ResponseTimeSlot } from '../../models/timeSlot/timeSlot.model';
import userMonthlyScheduleApi from './userMonthlySchedule.api';
import moment from 'moment';

interface MonthlyScheduleState {
    options: {
        month: number | null;
        year: number | null;
    };
    homeOptions: {
        month: number;
        year: number;
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
        month: moment().month() + 1,
        year: moment().year(),
    },
    homeOptions: {
        month: moment().month() + 1,
        year: moment().year(),
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

const setHomeOptions = (
    state: MonthlyScheduleState,
    action: PayloadAction<Pick<IMonthInfo, 'month' | 'year'>>,
) => {
    state.homeOptions = {
        year: action.payload.year,
        month: action.payload.month,
    };
};

const monthlyScheduleSlice = createSlice({
    name: SliceName.MONTHLY_SCHEDULE,
    initialState,
    reducers: { setOptions, clearOptions, clearRecords, setHomeOptions },
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
                clearRecords,
            )
            .addMatcher(
                monthlyScheduleApi.endpoints.deleteMonthlyDutySchedulesByMonth
                    .matchFulfilled,
                clearRecords,
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
            )
            .addMatcher(
                userMonthlyScheduleApi.endpoints
                    .userGetMonthlyDutyScheduleByMonth.matchFulfilled,
                (state, action) => {
                    if (action.payload.isSuccess) {
                        state.records = action.payload.data;
                    }

                    state.isRecordConfirmed = true;
                },
            )
            .addMatcher(
                userMonthlyScheduleApi.endpoints
                    .userGetMonthlyDutyScheduleByMonth.matchRejected,
                clearRecords,
            );
    },
});

export const monthlyScheduleSliceReducer = monthlyScheduleSlice.reducer;
export const monthlyScheduleSliceActions = monthlyScheduleSlice.actions;

export default monthlyScheduleSlice;
