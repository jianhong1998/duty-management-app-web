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
import PasswordInput from '../common/input/PasswordInput';
import { loginFn, verifyToken } from '../../store/loginSlice/login.thunk';
import { useAppDispatch, useAppSelector } from '../../store/index.store';
import { loadingSliceActions } from '../../store/loadingSlice/loading.slice';
import EmailChecker from '../../utils/emailChecker';
import { useNavigate } from 'react-router-dom';
import ErrorHandler from '../../utils/errorHandler';
import ToastifyController from '../../utils/toastifyController';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const navigate = useNavigate();

    const { token } = useAppSelector((state) => state.loginSlice);

    const dispatch = useAppDispatch();

    const { openLoading: startLoading, closeLoading: endLoading } =
        loadingSliceActions;

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

        dispatch(startLoading());

        dispatch(loginFn(requestBody))
            .unwrap()
            .then((loginResponse) => {
                if (!loginResponse.isSuccess) {
                    throw new Error(loginResponse.errorMessage);
                }

                ToastifyController.activeSuccess('Login Successfully.');
                homePageRedirectHandler();
            })
            .catch((error) => {
                ErrorHandler.activeToast(error);
            })
            .finally(() => {
                dispatch(endLoading());
            });
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

    useEffect(() => {
        if (token !== null) {
            homePageRedirectHandler();
            return;
        }

        dispatch(startLoading());

        dispatch(verifyToken())
            .unwrap()
            .catch((error) => {
                ErrorHandler.activeToast(error);
            })
            .finally(() => {
                dispatch(endLoading());
            });
    }, [token, dispatch, startLoading, endLoading, homePageRedirectHandler]);

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
                    Submit
                </Button>
            </div>
        </>
    );
};

export default LoginForm;
