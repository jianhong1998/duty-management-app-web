import {
    ChangeEventHandler,
    FC,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/index.store';
import { Grid, SelectChangeEvent, Stack } from '@mui/material';
import TextInput from '../../common/input/TextInput';
import { employeeFormSliceActions } from '../../../store/employeeFormSlice/employeeForm.slice';
import ContactNumberInput from '../../common/input/ContactNumberInput';
import SelectionInput from '../../common/input/SelectionInput';
import { UserAccountRoleType } from '../../../models/userAccount/userAccountRoleType.enum';
import {
    EmployeeRole,
    EmploymentType,
} from '../../../models/employee/employee.model';
import { IInputFieldError } from '../../../models/error/inputFieldError.model';
import PrimaryButton from '../../common/buttons/PrimaryButton';
import ContactNumberUtil from '../../../utils/contactNumberUtil';
import EmailAddressUtil from '../../../utils/emailAddressUtil';
import { loadingSliceActions } from '../../../store/loadingSlice/loading.slice';
import ToastifyController from '../../../utils/toastifyController';
import ErrorHandler from '../../../utils/errorHandler';
import {
    useCreateEmployeeAndUserAccountMutation,
    useGetEmployeeAndUserAccountQuery,
    useUpdateEmployeeAndUserAccountMutation,
} from '../../../store/api/userAccount.api';
import InputFieldErrorMessage from '../../../models/error/inputFieldErrorMessage.enum';
import DangerButton from '../../common/buttons/DangerButton';
import { QueryStatus } from '@reduxjs/toolkit/query/react';

interface IFormErrorState {
    name: IInputFieldError;
    accountType: IInputFieldError;
    contactNumber: IInputFieldError;
    emailAddress: IInputFieldError;
    employmentType: IInputFieldError;
    role: IInputFieldError;
}

const EmployeeForm: FC = () => {
    const [formErrorState, setFormErrorState] = useState<IFormErrorState>({
        name: { isError: false },
        contactNumber: { isError: false },
        emailAddress: { isError: false },
        accountType: { isError: false },
        employmentType: { isError: false },
        role: { isError: false },
    });
    const {
        formData,
        formMode,
        updateEmployeeFormPopup: { employeeId },
    } = useAppSelector((state) => state.employeeFormSlice);
    const { token } = useAppSelector((state) => state.loginSlice);

    const {
        accountType,
        contactNumber,
        emailAddress,
        employmentType,
        name,
        role,
    } = formData;

    const dispatch = useAppDispatch();

    const { setFormData, closeUpdateEmployeeFormPopup } =
        employeeFormSliceActions;
    const { closeLoading, openLoading } = loadingSliceActions;

    const [
        createEmployeeAndUserAccountFn,
        {
            isError: isCreateEmployeeError,
            isLoading: isCreateEmployeeLoading,
            isSuccess: isCreateEmployeeSuccess,
            data: createEmployeeData,
            error: createEmployeeError,
        },
    ] = useCreateEmployeeAndUserAccountMutation();
    const [
        updateEmployeeAndUserAccountFn,
        {
            isError: isUpdateEmployeeError,
            isLoading: isUpdateEmployeeLoading,
            isSuccess: isUpdateEmployeeSuccess,
            data: updateEmployeeData,
            error: updateEmployeeError,
        },
    ] = useUpdateEmployeeAndUserAccountMutation();

    const {
        status: getEmployeeStatus,
        data: getEmployeeData,
        error: getEmployeeError,
    } = useGetEmployeeAndUserAccountQuery(
        {
            token: token!,
            employeeId: employeeId!,
        },
        {
            skip:
                token === null || employeeId === null || formMode !== 'Update',
            refetchOnMountOrArgChange: true,
        },
    );

    const nameInputOnChangeHandler: ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        const newFormData = {
            ...formData,
        };

        if (event.target.value.length === 0) {
            newFormData.name = null;
        } else {
            newFormData.name = event.target.value;
        }

        dispatch(setFormData(newFormData));
    };

    const updateContactNumber = (contactNumber: number | null): void => {
        const newFormData = {
            ...formData,
        };

        if (contactNumber === null) {
            newFormData.contactNumber = null;
        } else {
            newFormData.contactNumber = contactNumber;
        }

        dispatch(setFormData(newFormData));
    };

    const emailInputOnChangeHandler: ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        const newFormData = {
            ...formData,
        };

        if (event.target.value.length === 0) {
            newFormData.emailAddress = null;
        } else {
            newFormData.emailAddress = event.target.value;
        }

        dispatch(setFormData(newFormData));
    };

    const accountTypeSelectionFieldOnChangeHandler = (
        event: SelectChangeEvent,
    ) => {
        const newFormData = {
            ...formData,
        };

        if (event.target.value.length === 0) {
            newFormData.accountType = null;
        } else {
            newFormData.accountType = event.target.value as UserAccountRoleType;
        }

        dispatch(setFormData(newFormData));
    };

    const roleSelectionFieldOnChangeHandler = (event: SelectChangeEvent) => {
        const newFormData = {
            ...formData,
        };

        if (event.target.value.length === 0) {
            newFormData.role = null;
        } else {
            newFormData.role = event.target.value as EmployeeRole;
        }

        dispatch(setFormData(newFormData));
    };

    const employmentTypeSelectionFieldOnChangeHandler = (
        event: SelectChangeEvent,
    ) => {
        const newFormData = {
            ...formData,
        };

        if (event.target.value.length === 0) {
            newFormData.employmentType = null;
        } else {
            newFormData.employmentType = event.target.value as EmploymentType;
        }

        dispatch(setFormData(newFormData));
    };

    const checkForm = useCallback(() => {
        const newFormErrorState = {
            ...formErrorState,
        };

        if (name === null) {
            newFormErrorState.name = {
                isError: true,
                message: InputFieldErrorMessage.FIELD_EMPTY,
            };
        }

        if (emailAddress === null) {
            newFormErrorState.emailAddress = {
                isError: true,
                message: InputFieldErrorMessage.FIELD_EMPTY,
            };
        } else if (!EmailAddressUtil.isEmailAddressValid(emailAddress)) {
            newFormErrorState.emailAddress = {
                isError: true,
                message: 'Invalid email address',
            };
        }

        if (contactNumber === null) {
            newFormErrorState.contactNumber = {
                isError: true,
                message: InputFieldErrorMessage.FIELD_EMPTY,
            };
        } else if (!ContactNumberUtil.isContactNumberValid(contactNumber)) {
            newFormErrorState.contactNumber = {
                isError: true,
                message: 'Invalid contact number',
            };
        }

        if (role === null) {
            newFormErrorState.role = {
                isError: true,
                message: InputFieldErrorMessage.FIELD_EMPTY,
            };
        }

        if (employmentType === null) {
            newFormErrorState.employmentType = {
                isError: true,
                message: InputFieldErrorMessage.FIELD_EMPTY,
            };
        }

        if (accountType === null) {
            newFormErrorState.accountType = {
                isError: true,
                message: InputFieldErrorMessage.FIELD_EMPTY,
            };
        }

        setFormErrorState(newFormErrorState);

        return (
            !newFormErrorState.accountType.isError &&
            !newFormErrorState.contactNumber.isError &&
            !newFormErrorState.emailAddress.isError &&
            !newFormErrorState.employmentType.isError &&
            !newFormErrorState.name.isError &&
            !newFormErrorState.role.isError
        );
    }, [
        name,
        contactNumber,
        emailAddress,
        accountType,
        role,
        employmentType,
        formErrorState,
    ]);

    const onSubmit = useCallback(() => {
        if (checkForm() && formMode === 'Create') {
            createEmployeeAndUserAccountFn({
                token: token || '',
                accountType: accountType!,
                contactNumber: contactNumber!,
                emailAddress: emailAddress!,
                employmentType: employmentType!,
                name: name!,
                role: role!,
            });
        } else if (checkForm() && formMode === 'Update') {
            updateEmployeeAndUserAccountFn({
                token: token || '',
                accountType: accountType!,
                contactNumber: contactNumber!,
                emailAddress: emailAddress!,
                employmentType: employmentType!,
                name: name!,
                role: role!,
                employeeId: employeeId!,
            });
        }
    }, [
        checkForm,
        token,
        accountType,
        contactNumber,
        emailAddress,
        employmentType,
        name,
        role,
        createEmployeeAndUserAccountFn,
        formMode,
        employeeId,
        updateEmployeeAndUserAccountFn,
    ]);

    const onClose = () => {
        dispatch(closeUpdateEmployeeFormPopup());
    };

    // Remove error message if input is empty and valid
    useEffect(() => {
        const newFormErrorState = {
            ...formErrorState,
        };

        if (formErrorState.name.isError && name !== null) {
            newFormErrorState.name = { isError: false };
        }

        if (
            formErrorState.contactNumber.isError &&
            formErrorState.contactNumber.message ===
                InputFieldErrorMessage.FIELD_EMPTY &&
            contactNumber !== null
        ) {
            newFormErrorState.contactNumber = { isError: false };
        } else if (
            formErrorState.contactNumber.isError &&
            contactNumber !== null &&
            ContactNumberUtil.isContactNumberValid(contactNumber)
        ) {
            newFormErrorState.contactNumber = { isError: false };
        }

        if (
            formErrorState.emailAddress.isError &&
            formErrorState.emailAddress.message ===
                InputFieldErrorMessage.FIELD_EMPTY &&
            emailAddress !== null
        ) {
            newFormErrorState.emailAddress = { isError: false };
        } else if (
            formErrorState.emailAddress.isError &&
            emailAddress !== null &&
            EmailAddressUtil.isEmailAddressValid(emailAddress)
        ) {
            newFormErrorState.emailAddress = { isError: false };
        }

        if (formErrorState.accountType.isError && accountType !== null) {
            newFormErrorState.accountType = { isError: false };
        }

        if (formErrorState.employmentType.isError && employmentType !== null) {
            newFormErrorState.employmentType = { isError: false };
        }

        if (formErrorState.role.isError && role !== null) {
            newFormErrorState.role = { isError: false };
        }

        setFormErrorState(newFormErrorState);
    }, [
        accountType,
        employmentType,
        role,
        name,
        contactNumber,
        emailAddress,
        formErrorState,
    ]);

    useEffect(() => {
        if (isCreateEmployeeLoading || isUpdateEmployeeLoading) {
            dispatch(openLoading());
            return;
        } else {
            dispatch(closeLoading());
        }

        if (
            formMode === 'Create' &&
            isCreateEmployeeSuccess &&
            typeof createEmployeeData !== 'undefined' &&
            createEmployeeData.isSuccess
        ) {
            ToastifyController.activeSuccess(createEmployeeData.data);
        }

        if (
            formMode === 'Create' &&
            isCreateEmployeeError &&
            typeof createEmployeeError !== 'undefined'
        ) {
            ErrorHandler.activeToast(createEmployeeError);
        }

        if (
            formMode === 'Update' &&
            isUpdateEmployeeError &&
            typeof updateEmployeeError !== 'undefined'
        ) {
            ErrorHandler.activeToast(updateEmployeeError);
        }

        if (formMode === 'Update' && isUpdateEmployeeSuccess) {
            ToastifyController.activeSuccess(
                `Successfully update employee's particulars`,
            );

            dispatch(closeUpdateEmployeeFormPopup());
        }
    }, [
        isCreateEmployeeLoading,
        isCreateEmployeeSuccess,
        createEmployeeData,
        isCreateEmployeeError,
        createEmployeeError,
        formMode,
        isUpdateEmployeeError,
        isUpdateEmployeeLoading,
        isUpdateEmployeeSuccess,
        updateEmployeeError,
        updateEmployeeData,
        name,
        dispatch,
        closeLoading,
        openLoading,
        closeUpdateEmployeeFormPopup,
    ]);

    useEffect(() => {
        if (
            formMode === 'Update' &&
            getEmployeeStatus === QueryStatus.rejected
        ) {
            ErrorHandler.activeToast(getEmployeeError);
        }

        if (
            formMode === 'Update' &&
            getEmployeeStatus === QueryStatus.fulfilled &&
            typeof getEmployeeData !== 'undefined' &&
            !getEmployeeData.isSuccess
        ) {
            ErrorHandler.activeToast(new Error(getEmployeeData.errorMessage));
        }
    }, [formMode, getEmployeeData, getEmployeeError, getEmployeeStatus]);

    return (
        <Grid
            container
            spacing={2}
        >
            <Grid
                item
                xs={12}
                md={12}
            >
                <TextInput
                    value={name || ''}
                    onChangeFn={nameInputOnChangeHandler}
                    label='Name'
                    error={formErrorState.name}
                />
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
            >
                <ContactNumberInput
                    label='Contact Number'
                    contactNumber={contactNumber}
                    contactNumberOnChangeHandler={updateContactNumber}
                    error={formErrorState.contactNumber}
                />
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
            >
                <TextInput
                    value={emailAddress || ''}
                    onChangeFn={emailInputOnChangeHandler}
                    label='Email Address'
                    error={formErrorState.emailAddress}
                />
            </Grid>
            <Grid
                item
                xs={6}
                md={4}
            >
                <SelectionInput
                    value={accountType}
                    label='Account Type'
                    options={Object.entries(UserAccountRoleType).map(
                        ([key, value]) => ({
                            label: key,
                            value,
                        }),
                    )}
                    onChangeHandler={accountTypeSelectionFieldOnChangeHandler}
                    error={formErrorState.accountType}
                />
            </Grid>
            <Grid
                item
                xs={6}
                md={4}
            >
                <SelectionInput
                    value={employmentType}
                    label='Employment Type'
                    options={Object.entries(EmploymentType).map(
                        ([, value]) => ({
                            label: value,
                            value,
                        }),
                    )}
                    onChangeHandler={
                        employmentTypeSelectionFieldOnChangeHandler
                    }
                    error={formErrorState.employmentType}
                />
            </Grid>
            <Grid
                item
                xs={12}
                md={4}
            >
                <SelectionInput
                    value={role}
                    label='Role'
                    options={Object.entries(EmployeeRole).map(([, value]) => ({
                        label: value,
                        value,
                    }))}
                    onChangeHandler={roleSelectionFieldOnChangeHandler}
                    error={formErrorState.role}
                />
            </Grid>
            <Grid
                item
                md={12}
                xs={12}
                display='flex'
                justifyContent='flex-end'
            >
                {formMode === 'Create' && (
                    <PrimaryButton onClickHanlder={onSubmit}>
                        Create Employee
                    </PrimaryButton>
                )}

                {formMode === 'Update' && (
                    <Stack
                        flexDirection='row'
                        gap={1}
                    >
                        <DangerButton onClickHanlder={onClose}>
                            Cancel
                        </DangerButton>
                        <PrimaryButton onClickHanlder={onSubmit}>
                            Update Employee
                        </PrimaryButton>
                    </Stack>
                )}
            </Grid>
        </Grid>
    );
};

export default EmployeeForm;
