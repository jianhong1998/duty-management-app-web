import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './screens/Home.screen';
import LoginPage from './screens/Login.screen';
import Loading from './components/common/loading/Loading';
import { ToastContainer } from 'react-toastify';
import DashboardTemplate from './components/dashboard/DashboardTemplate';
import NotFoundPage from './screens/NotFound.screen';
import EmployeePage from './screens/Employee.screen';
import AddEmployeePage from './screens/AddEmployee.screen';
import EditProfile from './screens/EditProfile.screen';
import MonthlyDutySchedulePage from './screens/MonthlyDutySchedule.screen';
import ForgetPasswordPage from './screens/ForgetPassword.screen';
import ResetPasswordPage from './screens/ResetPassword.screen';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './store/index.store';
import { loadingSliceActions } from './store/loadingSlice/loading.slice';
import { loginSliceActions } from './store/loginSlice/login.slice';
import UserAccountStatus from './models/userAccount/userAccountStatus.enum';
import { useLazyVerifyTokenQuery } from './store/api/auth.api';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import ErrorHandler from './utils/errorHandler';

function App() {
    const { token, accountStatus } = useAppSelector(
        (state) => state.loginSlice,
    );

    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useAppDispatch();

    const { setTokenAndUsername } = loginSliceActions;
    const { openLoading, closeLoading } = loadingSliceActions;

    const [
        verifyToken,
        {
            status: verifyTokenStatus,
            data: verifyTokenData,
            error: verifyTokenError,
        },
    ] = useLazyVerifyTokenQuery();

    useEffect(() => {
        if (
            (!localStorage.getItem('token') ||
                !localStorage.getItem('username') ||
                !localStorage.getItem('accountStatus')) &&
            !(
                location.pathname === '/login' ||
                location.pathname === '/forget-password'
            )
        ) {
            navigate('/login');
        }
    }, [location.pathname, navigate]);

    useEffect(() => {
        if (!token && !localStorage.getItem('token')) {
            return;
        }

        if (!token) {
            dispatch(
                setTokenAndUsername({
                    token: localStorage.getItem('token'),
                    username: localStorage.getItem('username'),
                    accountStatus: localStorage.getItem(
                        'accountStatus',
                    ) as UserAccountStatus,
                }),
            );
        }

        const tokenInStorage = localStorage.getItem('token');

        verifyToken(
            {
                token: tokenInStorage || '',
            },
            false,
        );
    }, [token, dispatch, setTokenAndUsername, verifyToken]);

    // Manage Loading
    useEffect(() => {
        if (verifyTokenStatus === QueryStatus.pending) {
            dispatch(openLoading());
            return;
        }

        dispatch(closeLoading());
    }, [verifyTokenStatus, dispatch, openLoading, closeLoading]);

    // Manage data and error
    useEffect(() => {
        if (
            verifyTokenStatus === QueryStatus.fulfilled &&
            typeof verifyTokenData === 'boolean'
        ) {
            if (!verifyTokenData) {
                navigate('/login');
                return;
            }

            if (accountStatus === UserAccountStatus.RESETING_PASSWORD) {
                navigate('/reset-password');
                return;
            }

            if (
                location.pathname === '/login' ||
                location.pathname === '/forgetPassword'
            ) {
                navigate('/');
                return;
            }

            if (
                accountStatus === UserAccountStatus.ACTIVE &&
                location.pathname === '/reset-password'
            ) {
                navigate('/');
                return;
            }

            return;
        }

        if (verifyTokenStatus === QueryStatus.rejected && verifyTokenError) {
            ErrorHandler.activeToast(verifyTokenError);
            return;
        }
    }, [
        verifyTokenData,
        verifyTokenError,
        verifyTokenStatus,
        accountStatus,
        location.pathname,
        navigate,
    ]);

    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={<DashboardTemplate />}
                >
                    <Route
                        index
                        element={<HomePage />}
                    />
                    <Route
                        path='/employee'
                        element={<EmployeePage />}
                    />
                    <Route
                        path='/add-employee'
                        element={<AddEmployeePage />}
                    />
                    <Route
                        path='/edit-profile'
                        element={<EditProfile />}
                    />
                    <Route
                        path='/duty-schedule'
                        element={<MonthlyDutySchedulePage />}
                    />
                    <Route
                        path='*'
                        element={<NotFoundPage />}
                    />
                </Route>
                <Route
                    path='/login'
                    element={<LoginPage />}
                />
                <Route
                    path='/forget-password'
                    element={<ForgetPasswordPage />}
                />
                <Route
                    path='/reset-password'
                    element={<ResetPasswordPage />}
                />
            </Routes>
            <Loading />
            <ToastContainer />
        </>
    );
}

export default App;
