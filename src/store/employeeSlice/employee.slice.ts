import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SliceName from '../sliceName';
import { IEmployee } from '../../models/employee/employee.model';
import { employeeApi } from './employee.api';
import { employeeTimeSlotApi } from '../api/employeeTimeSlot.api';
import { IEmployeeDefaultWeeklyTimeSlots } from '../../models/timeSlot/employeeTimeSlot.model';

interface EmployeeState {
    employees: IEmployee[];
    employeeDefaultWeeklyTimeSlots: IEmployeeDefaultWeeklyTimeSlots;
}

const initialState: EmployeeState = {
    employees: [],
    employeeDefaultWeeklyTimeSlots: {
        mon: null,
        tue: null,
        wed: null,
        thu: null,
        fri: null,
        sat: null,
        sun: null,
    },
};

const setEmployees = (
    state: EmployeeState,
    action: PayloadAction<IEmployee[]>,
) => {
    state.employees = action.payload;
};

const clearTimeSlots = (state: EmployeeState) => {
    state.employeeDefaultWeeklyTimeSlots = {
        mon: null,
        tue: null,
        wed: null,
        thu: null,
        fri: null,
        sat: null,
        sun: null,
    };
};

const employeeSlice = createSlice({
    name: SliceName.EMPLOYEE,
    initialState,
    reducers: {
        setEmployees,
        clearTimeSlots,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                employeeApi.endpoints.getAllEmployees.matchFulfilled,
                (state, action) => {
                    if (action.payload.isSuccess) {
                        state.employees = action.payload.data;
                    }
                },
            )
            .addMatcher(
                employeeTimeSlotApi.endpoints.getEmployeeDefaultWeeklyTimeSlots
                    .matchFulfilled,
                (state, action) => {
                    if (action.payload.isSuccess) {
                        state.employeeDefaultWeeklyTimeSlots =
                            action.payload.data;
                    }
                },
            );
    },
});

export const employeeSliceActions = employeeSlice.actions;
export const employeeSliceReducer = employeeSlice.reducer;

export default employeeSlice;
