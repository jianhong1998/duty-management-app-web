import { Stack, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import ResetPasswordForm from '../components/forms/resetPasswordForm/ResetPasswordForm';
import { Color } from '../constants/appTheme';
import { useResetUserAccountPasswordMutation } from '../store/api/password.api';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { useAppDispatch } from '../store/index.store';
import { loadingSliceActions } from '../store/loadingSlice/loading.slice';

const ResetPasswordPage: FC = () => {
    const [_, { status }] = useResetUserAccountPasswordMutation({
        fixedCacheKey: 'shareResetPasswordRequest',
    });

    const dispatch = useAppDispatch();

    const { openLoading, closeLoading } = loadingSliceActions;

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
                        md: 400,
                    },
                }}
                gap={3}
            >
                <Typography variant='body1'>
                    Enter the old password and new password to reset password.
                    New password must be 8 to 30 characters.
                </Typography>
                <ResetPasswordForm isForceReset={true} />
            </Stack>
        </Stack>
    );
};

export default ResetPasswordPage;
