import classes from '../loginForm/LoginForm.module.scss';

import {
    ChangeEventHandler,
    Dispatch,
    FC,
    MouseEventHandler,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import PasswordInput from '../../common/input/PasswordInput';
import { Stack } from '@mui/material';
import PrimaryButton from '../../common/buttons/PrimaryButton';
import SecondaryButton from '../../common/buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import ErrorHandler from '../../../utils/errorHandler';
import { useResetUserAccountPasswordMutation } from '../../../store/api/password.api';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import ToastifyController from '../../../utils/toastifyController';
import { useAppDispatch, useAppSelector } from '../../../store/index.store';
import { loginSliceActions } from '../../../store/loginSlice/login.slice';

interface ResetPasswordFormProps {
    isForceReset: boolean;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ isForceReset }) => {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

    const navigate = useNavigate();

    const { token } = useAppSelector((state) => state.loginSlice);

    const [sendResetPasswordRequest, { status, error, data, reset }] =
        useResetUserAccountPasswordMutation({
            fixedCacheKey: 'shareResetPasswordRequest',
        });

    const dispatch = useAppDispatch();

    const { setAccountStatus } = loginSliceActions;

    const passwordOnChangeHandler = (
        setValueFn: Dispatch<SetStateAction<string>>,
    ): ChangeEventHandler<HTMLInputElement> => {
        return (event) => {
            const password = event.target.value;

            if (password.length > 30) {
                return;
            }

            setValueFn(password);
        };
    };

    const onSubmitHandler = () => {
        if (oldPassword.length < 8 || oldPassword.length > 30) {
            ErrorHandler.activeToast(
                new Error('Old password must be 8 to 30 characters'),
            );

            return;
        }

        if (newPassword.length < 8 || newPassword.length > 30) {
            ErrorHandler.activeToast(
                new Error('New password must be 8 to 30 characters'),
            );

            return;
        }

        if (newPassword !== confirmNewPassword) {
            ErrorHandler.activeToast(
                new Error(
                    'New password and confirm new password must be the same',
                ),
            );

            return;
        }

        sendResetPasswordRequest({
            token: token || '',
            oldPassword,
            newPassword,
        });
    };

    const backButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (status === QueryStatus.fulfilled && data?.isSuccess) {
            ToastifyController.activeSuccess(data.data.message);
            localStorage.setItem('accountStatus', data.data.accountStatus);
            dispatch(setAccountStatus(data.data.accountStatus));
            reset();
        }

        if (status === QueryStatus.rejected && error) {
            ErrorHandler.activeToast(error);
            reset();
        }
    }, [status, data, error, dispatch, reset, setAccountStatus]);

    return (
        <Stack gap={5}>
            <Stack
                gap={2}
                width={'100%'}
            >
                <PasswordInput
                    id='oldPassword'
                    label='Old Password'
                    value={oldPassword}
                    onChangeHandler={passwordOnChangeHandler(setOldPassword)}
                    enterOnPressHandler={onSubmitHandler}
                    classes={[classes.item]}
                />
                <PasswordInput
                    id='newPassword'
                    label='New Password'
                    value={newPassword}
                    onChangeHandler={passwordOnChangeHandler(setNewPassword)}
                    enterOnPressHandler={onSubmitHandler}
                    classes={[classes.item]}
                />
                <PasswordInput
                    id='confirmNewPassword'
                    label='Confirm New Password'
                    value={confirmNewPassword}
                    onChangeHandler={passwordOnChangeHandler(
                        setConfirmNewPassword,
                    )}
                    enterOnPressHandler={onSubmitHandler}
                    classes={[classes.item]}
                />
            </Stack>
            <Stack
                gap={2}
                width={'100%'}
            >
                <PrimaryButton
                    onClickHanlder={onSubmitHandler}
                    style={{ width: '100%' }}
                >
                    Reset Password
                </PrimaryButton>
                {!isForceReset && (
                    <SecondaryButton
                        onClickHanlder={backButtonOnClickHandler}
                        style={{ width: '100%' }}
                    >
                        Back
                    </SecondaryButton>
                )}
            </Stack>
        </Stack>
    );
};

export default ResetPasswordForm;
