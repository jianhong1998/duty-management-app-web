import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SliceName from '../sliceName';
import {
    EmployeeRole,
    EmploymentType,
} from '../../models/employee/employee.model';
import { UserAccountRoleType } from '../../models/userAccount/userAccountRoleType.enum';
import { userAccountApi } from '../api/userAccount.api';

interface IEmployeeFormStateFormData {
    name: string | null;
    employmentType: EmploymentType | null;
    role: EmployeeRole | null;
    contactNumber: number | null;
    emailAddress: string | null;
    accountType: UserAccountRoleType | null;
}

interface EmployeeFormState {
    formData: IEmployeeFormStateFormData;
}

const initialState: EmployeeFormState = {
    formData: {
        name: null,
        accountType: null,
        contactNumber: null,
        emailAddress: null,
        employmentType: null,
        role: null,
    },
};

const setFormData = (
    state: EmployeeFormState,
    action: PayloadAction<IEmployeeFormStateFormData>,
) => {
    state.formData = action.payload;
};

const employeeFormSlice = createSlice({
    name: SliceName.EMPLOYEE_FORM,
    initialState,
    reducers: {
        setFormData,
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userAccountApi.endpoints.createEmployeeAndUserAccount
                .matchFulfilled,
            (state) => {
                state.formData = {
                    accountType: null,
                    contactNumber: null,
                    emailAddress: null,
                    employmentType: null,
                    name: null,
                    role: null,
                };
            },
        );
    },
});

export const employeeFormSliceActions = employeeFormSlice.actions;
export const employeeFormSliceReducer = employeeFormSlice.reducer;

export default employeeFormSlice;
