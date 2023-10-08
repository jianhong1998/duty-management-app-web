import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SliceName from '../sliceName';
import {
    EmployeeRole,
    EmploymentType,
} from '../../models/employee/employee.model';
import { UserAccountRoleType } from '../../models/userAccount/userAccountRoleType.enum';
import { userAccountApi } from '../api/userAccount.api';

type IEmployeeFormMode = 'Create' | 'Update';

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
    formMode: IEmployeeFormMode;
    updateEmployeeFormPopup: {
        isOpen: boolean;
        employeeId: number | null;
    };
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
    formMode: 'Create',
    updateEmployeeFormPopup: {
        isOpen: false,
        employeeId: null,
    },
};

const setFormData = (
    state: EmployeeFormState,
    action: PayloadAction<IEmployeeFormStateFormData>,
) => {
    state.formData = action.payload;
};

const setFormMode = (
    state: EmployeeFormState,
    action: PayloadAction<IEmployeeFormMode>,
) => {
    state.formMode = action.payload;
};

const openUpdateEmployeeFormPopup = (
    state: EmployeeFormState,
    action: PayloadAction<number>,
) => {
    state.formMode = 'Update';
    state.updateEmployeeFormPopup.isOpen = true;
    state.updateEmployeeFormPopup.employeeId = action.payload;
};

const closeUpdateEmployeeFormPopup = (state: EmployeeFormState) => {
    state.updateEmployeeFormPopup.isOpen = false;
    state.updateEmployeeFormPopup.employeeId = null;
    state.formMode = 'Create';
    state.formData = {
        name: null,
        contactNumber: null,
        emailAddress: null,
        accountType: null,
        employmentType: null,
        role: null,
    };
};

const employeeFormSlice = createSlice({
    name: SliceName.EMPLOYEE_FORM,
    initialState,
    reducers: {
        setFormData,
        setFormMode,
        openUpdateEmployeeFormPopup,
        closeUpdateEmployeeFormPopup,
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
        builder.addMatcher(
            userAccountApi.endpoints.getEmployeeAndUserAccount.matchFulfilled,
            (state, action) => {
                if (action.payload.isSuccess) {
                    state.formData = action.payload.data;
                }
            },
        );
    },
});

export const employeeFormSliceActions = employeeFormSlice.actions;
export const employeeFormSliceReducer = employeeFormSlice.reducer;

export default employeeFormSlice;
