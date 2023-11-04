import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SliceName from '../sliceName';
import { IEmployee } from '../../models/employee/employee.model';
import { employeeApi } from './employee.api';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';

interface EmployeeState {
    employees: IEmployee[];
    employeeTable: {
        paginationModel: GridPaginationModel;
        sortModel: GridSortModel;
        totalRows: number;
        maxPage: number;
    };
}

const initialState: EmployeeState = {
    employees: [],
    employeeTable: {
        paginationModel: {
            page: 0,
            pageSize: 5,
        },
        sortModel: [],
        totalRows: 0,
        maxPage: 0,
    },
};

const setEmployees = (
    state: EmployeeState,
    action: PayloadAction<IEmployee[]>,
) => {
    state.employees = action.payload;
};

const setEmployeeTablePaginationModel = (
    state: EmployeeState,
    action: PayloadAction<GridPaginationModel>,
) => {
    state.employeeTable.paginationModel = action.payload;
};

const setEmployeeTableSortModel = (
    state: EmployeeState,
    action: PayloadAction<GridSortModel>,
) => {
    state.employeeTable.sortModel = action.payload;
};

const employeeSlice = createSlice({
    name: SliceName.EMPLOYEE,
    initialState,
    reducers: {
        setEmployees,
        setEmployeeTablePaginationModel,
        setEmployeeTableSortModel,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                employeeApi.endpoints.getAllEmployees.matchFulfilled,
                (state, action) => {
                    if (action.payload.isSuccess) {
                        const { totalRecords, totalPages } =
                            action.payload.data.paginationInfo;

                        state.employees = action.payload.data.employees;
                        state.employeeTable.totalRows = totalRecords;
                        state.employeeTable.maxPage = totalPages;
                    }
                },
            )
            .addMatcher(
                employeeApi.endpoints.deactivateEmployee.matchFulfilled,
                (state, action) => {
                    if (action.payload.isSuccess) {
                        const newEmployees = [...state.employees];
                        const employeeIndexMap = new Map<number, number>(
                            newEmployees.map((employee, index) => [
                                employee.id,
                                index,
                            ]),
                        );

                        action.payload.data.forEach(({ id, isActive }) => {
                            const index = employeeIndexMap.get(id);

                            if (typeof index === 'undefined') return;

                            newEmployees[index].id = id;
                            newEmployees[index].isActive = isActive;
                        });

                        state.employees = newEmployees;
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
