import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISimplifiedTimeSlotResponse } from '../../models/timeSlot/timeSlot.model';
import { timeSlotApi } from '../api/timeSlot.api';
import SliceName from '../sliceName';
import { WeekDay } from '../../constants/weekDay';
import { employeeTimeSlotApi } from '../api/employeeTimeSlot.api';

interface TimeSlotState {
    availableTimeSlots: {
        mon: ISimplifiedTimeSlotResponse[];
        tue: ISimplifiedTimeSlotResponse[];
        wed: ISimplifiedTimeSlotResponse[];
        thu: ISimplifiedTimeSlotResponse[];
        fri: ISimplifiedTimeSlotResponse[];
        sat: ISimplifiedTimeSlotResponse[];
        sun: ISimplifiedTimeSlotResponse[];
    };
    chosenTimeSlots: {
        mon: number | null;
        tue: number | null;
        wed: number | null;
        thu: number | null;
        fri: number | null;
        sat: number | null;
        sun: number | null;
    };
}

const initialState: TimeSlotState = {
    availableTimeSlots: {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: [],
    },
    chosenTimeSlots: {
        mon: null,
        tue: null,
        wed: null,
        thu: null,
        fri: null,
        sat: null,
        sun: null,
    },
};

const setChosenTimeSlots = (
    state: TimeSlotState,
    action: PayloadAction<{ weekDay: WeekDay; timeSlotId: number | null }>,
) => {
    state.chosenTimeSlots[action.payload.weekDay] = action.payload.timeSlotId;
};

const clearAvailabileTimeSlots = (state: TimeSlotState) => {
    state.availableTimeSlots = {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: [],
    };
};

const clearChosenTimeSlots = (state: TimeSlotState) => {
    state.chosenTimeSlots = {
        mon: null,
        tue: null,
        wed: null,
        thu: null,
        fri: null,
        sat: null,
        sun: null,
    };
};

const timeSlotSlice = createSlice({
    name: SliceName.TIME_SLOT,
    initialState,
    reducers: {
        clearAvailabileTimeSlots,
        setChosenTimeSlots,
        clearChosenTimeSlots,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                timeSlotApi.endpoints.getAllAvailableTimeSlots.matchFulfilled,
                (state, action) => {
                    if (action.payload.isSuccess) {
                        const { data: timeSlotResponses } = action.payload;

                        const newTimeSlots = {
                            mon: [] as ISimplifiedTimeSlotResponse[],
                            tue: [] as ISimplifiedTimeSlotResponse[],
                            wed: [] as ISimplifiedTimeSlotResponse[],
                            thu: [] as ISimplifiedTimeSlotResponse[],
                            fri: [] as ISimplifiedTimeSlotResponse[],
                            sat: [] as ISimplifiedTimeSlotResponse[],
                            sun: [] as ISimplifiedTimeSlotResponse[],
                        };

                        timeSlotResponses.forEach((timeSlotResponse) => {
                            const {
                                id,
                                startTime,
                                endTime,
                                isDeleted,
                                isAvailableFor,
                            } = timeSlotResponse;

                            if (isDeleted) {
                                return;
                            }

                            const timeSlot = {
                                id,
                                startTime,
                                endTime,
                            };

                            const { mon, tue, wed, thu, fri, sat, sun } =
                                isAvailableFor;

                            if (mon) {
                                newTimeSlots.mon.push(timeSlot);
                            }

                            if (tue) {
                                newTimeSlots.tue.push(timeSlot);
                            }

                            if (wed) {
                                newTimeSlots.wed.push(timeSlot);
                            }

                            if (thu) {
                                newTimeSlots.thu.push(timeSlot);
                            }

                            if (fri) {
                                newTimeSlots.fri.push(timeSlot);
                            }

                            if (sat) {
                                newTimeSlots.sat.push(timeSlot);
                            }

                            if (sun) {
                                newTimeSlots.sun.push(timeSlot);
                            }
                        });

                        newTimeSlots.mon = newTimeSlots.mon.sort((a, b) => {
                            const startTimeA = new Date(
                                `2023-01-01T${a.startTime}+08:00`,
                            );
                            const startTimeB = new Date(
                                `2023-01-01T${b.startTime}+08:00`,
                            );

                            return startTimeA.getTime() - startTimeB.getTime();
                        });

                        newTimeSlots.tue = newTimeSlots.tue.sort((a, b) => {
                            const startTimeA = new Date(
                                `2023-01-01T${a.startTime}+08:00`,
                            );
                            const startTimeB = new Date(
                                `2023-01-01T${b.startTime}+08:00`,
                            );

                            return startTimeA.getTime() - startTimeB.getTime();
                        });

                        newTimeSlots.wed = newTimeSlots.wed.sort((a, b) => {
                            const startTimeA = new Date(
                                `2023-01-01T${a.startTime}+08:00`,
                            );
                            const startTimeB = new Date(
                                `2023-01-01T${b.startTime}+08:00`,
                            );

                            return startTimeA.getTime() - startTimeB.getTime();
                        });

                        newTimeSlots.thu = newTimeSlots.thu.sort((a, b) => {
                            const startTimeA = new Date(
                                `2023-01-01T${a.startTime}+08:00`,
                            );
                            const startTimeB = new Date(
                                `2023-01-01T${b.startTime}+08:00`,
                            );

                            return startTimeA.getTime() - startTimeB.getTime();
                        });

                        newTimeSlots.fri = newTimeSlots.fri.sort((a, b) => {
                            const startTimeA = new Date(
                                `2023-01-01T${a.startTime}+08:00`,
                            );
                            const startTimeB = new Date(
                                `2023-01-01T${b.startTime}+08:00`,
                            );

                            return startTimeA.getTime() - startTimeB.getTime();
                        });

                        newTimeSlots.sat = newTimeSlots.sat.sort((a, b) => {
                            const startTimeA = new Date(
                                `2023-01-01T${a.startTime}+08:00`,
                            );
                            const startTimeB = new Date(
                                `2023-01-01T${b.startTime}+08:00`,
                            );

                            return startTimeA.getTime() - startTimeB.getTime();
                        });

                        newTimeSlots.sun = newTimeSlots.sun.sort((a, b) => {
                            const startTimeA = new Date(
                                `2023-01-01T${a.startTime}+08:00`,
                            );
                            const startTimeB = new Date(
                                `2023-01-01T${b.startTime}+08:00`,
                            );

                            return startTimeA.getTime() - startTimeB.getTime();
                        });

                        state.availableTimeSlots = newTimeSlots;
                    }
                },
            )
            .addMatcher(
                employeeTimeSlotApi.endpoints.getEmployeeDefaultWeeklyTimeSlots
                    .matchFulfilled,
                (state, action) => {
                    if (action.payload.isSuccess) {
                        const { mon, tue, wed, thu, fri, sat, sun } =
                            action.payload.data;

                        const chosenTimeSlots = {
                            mon: mon?.id || null,
                            tue: tue?.id || null,
                            wed: wed?.id || null,
                            thu: thu?.id || null,
                            fri: fri?.id || null,
                            sat: sat?.id || null,
                            sun: sun?.id || null,
                        };

                        state.chosenTimeSlots = chosenTimeSlots;
                    }
                },
            )
            .addMatcher(
                employeeTimeSlotApi.endpoints.putEmployeeDefaultWeeklyTimeSlots
                    .matchFulfilled,
                (state, action) => {
                    if (action.payload.isSuccess) {
                        const { mon, tue, wed, thu, fri, sat, sun } =
                            action.payload.data;

                        state.chosenTimeSlots = {
                            mon: mon?.id || null,
                            tue: tue?.id || null,
                            wed: wed?.id || null,
                            thu: thu?.id || null,
                            fri: fri?.id || null,
                            sat: sat?.id || null,
                            sun: sun?.id || null,
                        };
                    }
                },
            );
    },
});

export const timeSlotSliceActions = timeSlotSlice.actions;
export const timeSlotSliceReducer = timeSlotSlice.reducer;

export default timeSlotSlice;
