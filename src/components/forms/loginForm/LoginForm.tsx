import classes from './LoginForm.module.scss';

import { Button, TextField } from '@mui/material';
import {
    ChangeEventHandler,
    FC,
    KeyboardEventHandler,
    MouseEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import PasswordInput from '../../common/input/PasswordInput';
import { useAppDispatch, useAppSelector } from '../../../store/index.store';
import { loadingSliceActions } from '../../../store/loadingSlice/loading.slice';
import EmailChecker from '../../../utils/emailChecker';
import { useNavigate } from 'react-router-dom';
import ErrorHandler from '../../../utils/errorHandler';
import ToastifyController from '../../../utils/toastifyController';
import SecondaryButton from '../../common/buttons/SecondaryButton';
import {
    useLazyVerifyTokenQuery,
    useLoginMutation,
} from '../../../store/api/auth.api';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const navigate = useNavigate();

    const { token } = useAppSelector((state) => state.loginSlice);

    const dispatch = useAppDispatch();

    const { openLoading: startLoading, closeLoading: endLoading } =
        loadingSliceActions;

    const [
        loginFn,
        {
            status: loginFnStatus,
            data: loginFnData,
            error: loginFnError,
            reset: resetLoginFn,
        },
    ] = useLoginMutation();

    const [
        verifyToken,
        { status: verifyTokenStatus, error: verifyTokenError },
    ] = useLazyVerifyTokenQuery();

    const passwordOnChangeHandler: ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        setPassword(event.target.value);
    };

    const emailOnChangeHandler: ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        setEmail(event.target.value);
    };

    const onSubmitHandler: MouseEventHandler<HTMLButtonElement> = async () => {
        const requestBody = { password, email };

        if (!EmailChecker.check(email)) {
            ErrorHandler.activeToast('Email format is incorrect.');
            return;
        }

        loginFn(requestBody);
    };

    const emailInputEnterOnPressHandler: KeyboardEventHandler<
        HTMLInputElement
    > = (event) => {
        if (event.key === 'Enter') {
            enterOnPressHandler();
        }
    };

    const enterOnPressHandler = () => {
        submitButtonRef.current?.click();
    };

    const homePageRedirectHandler = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const forgetPasswordButtonOnclickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        navigate('/forget-password');
    };

    useEffect(() => {
        if (token !== null) {
            homePageRedirectHandler();
            return;
        }

        const tokenInStorage = localStorage.getItem('token');

        verifyToken({
            token: tokenInStorage || '',
        });
    }, [token, dispatch, homePageRedirectHandler, verifyToken]);

    // Control Loading
    useEffect(() => {
        if (
            loginFnStatus === QueryStatus.pending ||
            verifyTokenStatus === QueryStatus.pending
        ) {
            dispatch(startLoading());
            return;
        }

        dispatch(endLoading());
    }, [loginFnStatus, verifyTokenStatus, dispatch, startLoading, endLoading]);

    useEffect(() => {
        try {
            if (loginFnStatus === QueryStatus.fulfilled && loginFnData) {
                if (!loginFnData.isSuccess) {
                    throw new Error(loginFnData.errorMessage);
                }

                ToastifyController.activeSuccess('Login Successfully.');
                resetLoginFn();
                homePageRedirectHandler();
                return;
            }

            if (loginFnStatus === QueryStatus.rejected && loginFnError) {
                throw loginFnError;
            }
        } catch (error) {
            ErrorHandler.activeToast(error);
            resetLoginFn();
        }
    }, [
        loginFnStatus,
        loginFnData,
        loginFnError,
        homePageRedirectHandler,
        resetLoginFn,
    ]);

    useEffect(() => {
        if (verifyTokenStatus === QueryStatus.rejected && verifyTokenError) {
            ErrorHandler.activeToast(verifyTokenError);
            return;
        }
    }, [verifyTokenStatus, verifyTokenError]);

    return (
        <>
            <div className={classes.formContainer}>
                <TextField
                    label='Email'
                    className={classes.item}
                    value={email}
                    onChange={emailOnChangeHandler}
                    onKeyDown={emailInputEnterOnPressHandler}
                    autoFocus={true}
                />
                <PasswordInput
                    label='Password'
                    id='login-password'
                    classes={[classes.item]}
                    value={password}
                    enterOnPressHandler={enterOnPressHandler}
                    onChangeHandler={passwordOnChangeHandler}
                />
                <Button
                    variant='outlined'
                    className={`${classes.item} ${classes.button}`}
                    onClick={onSubmitHandler}
                    disabled={email.length === 0 || password.length === 0}
                    ref={submitButtonRef}
                >
                    Login
                </Button>
                <SecondaryButton
                    style={{ width: '100%' }}
                    onClickHanlder={forgetPasswordButtonOnclickHandler}
                >
                    Forget Password
                </SecondaryButton>
            </div>
        </>
    );
};

export default LoginForm;
