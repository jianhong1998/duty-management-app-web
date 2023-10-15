import { FC, useEffect } from 'react';
import LoginForm from '../components/forms/loginForm/LoginForm';
import { useAppDispatch, useAppSelector } from '../store/index.store';
import { loginSliceActions } from '../store/loginSlice/login.slice';
import { verifyToken } from '../store/loginSlice/login.thunk';
import { useNavigate } from 'react-router-dom';
import { loadingSliceActions } from '../store/loadingSlice/loading.slice';

const LoginPage: FC = () => {
    const { token } = useAppSelector((state) => state.loginSlice);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { setTokenAndUsername } = loginSliceActions;
    const { openLoading, closeLoading } = loadingSliceActions;

    useEffect(() => {
        if (
            !localStorage.getItem('token') ||
            !localStorage.getItem('username')
        ) {
            return;
        }

        if (!token) {
            dispatch(
                setTokenAndUsername({
                    token: localStorage.getItem('token'),
                    username: localStorage.getItem('username'),
                }),
            );
        }

        dispatch(openLoading());

        dispatch(verifyToken())
            .unwrap()
            .then((isValid) => {
                if (isValid) {
                    navigate('/');
                }
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                dispatch(closeLoading());
            });
    }, [
        token,
        dispatch,
        setTokenAndUsername,
        openLoading,
        closeLoading,
        navigate,
    ]);

    return (
        <>
            <LoginForm />
        </>
    );
};

export default LoginPage;
