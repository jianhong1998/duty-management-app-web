import { FC, useCallback, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import DashboardNavigator from './DashboardNavigator';
import appTheme, { Color, DRAWER_WIDTH } from '../../constants/appTheme';
import { useMediaQuery } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardFooter from './DashboardFooter';
import { useAppDispatch } from '../../store/index.store';
import ToastifyController from '../../utils/toastifyController';
import ErrorHandler from '../../utils/errorHandler';
import { loadingSliceActions } from '../../store/loadingSlice/loading.slice';
import { useLazyVerifyTokenQuery } from '../../store/api/auth.api';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';

const DashboardTemplate: FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMdUp = useMediaQuery(appTheme.breakpoints.up('md'));
    const [documentWidth, setDocumentWidth] = useState(
        document.body.offsetWidth,
    );

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { openLoading, closeLoading } = loadingSliceActions;

    const [
        verifyToken,
        {
            status: verifyTokenStatus,
            data: verifyTokenData,
            error: verifyTokenError,
        },
    ] = useLazyVerifyTokenQuery();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleWindowResize = useCallback(() => {
        setDocumentWidth(document.body.clientWidth);
    }, []);

    useEffect(() => {
        const tokenInStorage = localStorage.getItem('token');

        verifyToken({ token: tokenInStorage || '' });
    }, [verifyToken]);

    // Control loading
    useEffect(() => {
        if (verifyTokenStatus === QueryStatus.pending) {
            dispatch(openLoading());
            return;
        }

        dispatch(closeLoading());
    }, [verifyTokenStatus, dispatch, openLoading, closeLoading]);

    useEffect(() => {
        if (verifyTokenStatus === QueryStatus.fulfilled && !verifyTokenData) {
            ToastifyController.activeError(
                'Token is invalid or expired. Please login again.',
            );

            navigate('/login');
            return;
        }

        if (verifyTokenStatus === QueryStatus.rejected && verifyTokenError) {
            ErrorHandler.activeToast(verifyTokenError);
        }
    }, [verifyTokenData, verifyTokenError, verifyTokenStatus, navigate]);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, [handleWindowResize]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    minHeight: '100vh',
                    width: documentWidth,
                }}
            >
                <CssBaseline />
                <Box
                    component='nav'
                    sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
                >
                    {isMdUp ? null : (
                        <DashboardNavigator
                            PaperProps={{ style: { width: DRAWER_WIDTH } }}
                            variant='temporary'
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                        />
                    )}
                    <DashboardNavigator
                        PaperProps={{ style: { width: DRAWER_WIDTH } }}
                        sx={{
                            display: { md: 'block', sm: 'none', xs: 'none' },
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        width: {
                            xs: '100%',
                            md: documentWidth - DRAWER_WIDTH,
                        },
                    }}
                >
                    <DashboardHeader onDrawerToggle={handleDrawerToggle} />
                    <Box
                        component='main'
                        sx={{ flex: 1, py: 1, px: 1, bgcolor: Color.grey }}
                    >
                        {<Outlet />}
                    </Box>
                    <Box>
                        <DashboardFooter />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DashboardTemplate;
