import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SliceName from '../sliceName';
import { IEmployee } from '../../models/employee/employee.model';
import { employeeApi } from './employee.api';

interface EmployeeState {
    employees: IEmployee[];
}

const initialState: EmployeeState = {
    employees: [],
};

const setEmployees = (
    state: EmployeeState,
    action: PayloadAction<IEmployee[]>,
) => {
    state.employees = action.payload;
};

const employeeSlice = createSlice({
    name: SliceName.EMPLOYEE,
    initialState,
    reducers: {
        setEmployees,
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
                employeeApi.endpoints.deactivateEmployee.matchFulfilled,
                (state, action) => {
                    if (action.payload.isSuccess) {
                        const employeeId = action.payload.data[0].id;

                        state.employees.forEach((employee) => {
                            if (
                                employee.id === employeeId &&
                                action.payload.isSuccess
                            ) {
                                employee.isActive =
                                    action.payload.data[0].isActive;
                            }
                        });
                    }
                },
            )
            .addMatcher(
                employeeApi.endpoints.reactivateEmployee.matchFulfilled,
                (state, action) => {
                    if (action.payload.isSuccess) {
                        const employeeId = action.payload.data.id;

                        state.employees.forEach((employee) => {
                            if (
                                employee.id === employeeId &&
                                action.payload.isSuccess
                            ) {
                                employee.isActive =
                                    action.payload.data.isActive;
                            }
                        });
                    }
                },
            );
    },
});

export const employeeSliceActions = employeeSlice.actions;
export const employeeSliceReducer = employeeSlice.reducer;

export default employeeSlice;
