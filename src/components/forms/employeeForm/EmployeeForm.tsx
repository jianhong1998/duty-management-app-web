import {
    ChangeEventHandler,
    FC,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/index.store';
import { Grid, SelectChangeEvent } from '@mui/material';
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
import { useCreateEmployeeAndUserAccountMutation } from '../../../store/api/userAccount.api';
import InputFieldErrorMessage from '../../../models/error/inputFieldErrorMessage.enum';

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
    const { formData } = useAppSelector((state) => state.employeeFormSlice);
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

    const { setFormData } = employeeFormSliceActions;
    const { closeLoading, openLoading } = loadingSliceActions;

    const [
        createEmployeeAndUserAccountFn,
        { isError, isLoading, isSuccess, data, error },
    ] = useCreateEmployeeAndUserAccountMutation();

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
        if (checkForm()) {
            createEmployeeAndUserAccountFn({
                token: token || '',
                accountType: accountType!,
                contactNumber: contactNumber!,
                emailAddress: emailAddress!,
                employmentType: employmentType!,
                name: name!,
                role: role!,
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
    ]);

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
        if (isLoading) {
            dispatch(openLoading());
            return;
        } else {
            dispatch(closeLoading());
        }

        if (isSuccess && typeof data !== 'undefined' && data.isSuccess) {
            ToastifyController.activeSuccess(data.data);
        }

        if (isError && typeof error !== 'undefined') {
            ErrorHandler.activeToast(error);
        }
    }, [
        isLoading,
        dispatch,
        closeLoading,
        openLoading,
        isSuccess,
        data,
        isError,
        error,
    ]);

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
                <PrimaryButton onClickHanlder={onSubmit}>Submit</PrimaryButton>
            </Grid>
        </Grid>
    );
};

export default EmployeeForm;
