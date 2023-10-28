import { Stack, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import ForgetPasswordForm from '../components/forms/forgetPasswordForm/ForgetPasswordForm';
import { Color } from '../constants/appTheme';
import { useAppDispatch } from '../store/index.store';
import { loadingSliceActions } from '../store/loadingSlice/loading.slice';
import { useForgetUserAccountPasswordMutation } from '../store/api/password.api';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';

const ForgetPasswordPage: FC = () => {
    const dispatch = useAppDispatch();

    const { openLoading, closeLoading } = loadingSliceActions;

    const [_, { status }] = useForgetUserAccountPasswordMutation({
        fixedCacheKey: 'forgetPasswordRequest',
    });

    useEffect(() => {
        if (status === QueryStatus.pending) {
            dispatch(openLoading());
        } else {
            dispatch(closeLoading());
        }
    }, [status, dispatch, openLoading, closeLoading]);

    return (
        <Stack
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '96vh',
            }}
            gap={5}
        >
            <Stack
                sx={{
                    backgroundColor: Color.white,
                    paddingX: 5,
                    paddingY: 5,
                    borderRadius: 4,
                    boxShadow: 5,
                    textAlign: 'center',
                    width: {
                        sm: 300,
                        md: 500,
                    },
                }}
                gap={3}
            >
                <Typography variant='body1'>
                    Enter your email address to reset password. An email with
                    reset password instruction will be sent to your email
                    address.
                </Typography>
                <ForgetPasswordForm />
            </Stack>
        </Stack>
    );
};

export default ForgetPasswordPage;
