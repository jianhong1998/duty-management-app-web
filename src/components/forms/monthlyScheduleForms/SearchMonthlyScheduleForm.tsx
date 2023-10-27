import { FC, useEffect } from 'react';
import MonthSelection from './MonthSelection';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import YearSelection from './YearSelection';
import PrimaryButton from '../../common/buttons/PrimaryButton';
import DangerButton from '../../common/buttons/DangerButton';
import { useAppSelector } from '../../../store/index.store';
import {
    useConfirmMonthlyDutyScheduleByMonthMutation,
    useDeleteMonthlyDutySchedulesByMonthMutation,
    usePostMonthlyDutyScheduleByMonthMutation,
} from '../../../store/monthlyScheduleSice/monthlySchedule.api';
import ToastifyController from '../../../utils/toastifyController';
import ErrorHandler from '../../../utils/errorHandler';
import { QueryStatus } from '@reduxjs/toolkit/query/react';

const SearchMonthlyScheduleForm: FC = () => {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { monthlyDutySchedules } = useAppSelector(
        (state) => state.monthlyScheduleSlice.records,
    );
    const { month, year } = useAppSelector(
        (state) => state.monthlyScheduleSlice.options,
    );
    const { isRecordConfirmed } = useAppSelector(
        (state) => state.monthlyScheduleSlice,
    );
    const { token } = useAppSelector((state) => state.loginSlice);

    const [
        generateMonthlyDutySchedule,
        {
            status: postStatus,
            data: postData,
            error: postError,
            reset: resetPost,
        },
    ] = usePostMonthlyDutyScheduleByMonthMutation({
        fixedCacheKey: 'sharePostMonthlyDutyScheduleResult',
    });

    const [
        confirmMonthlyDuetySchedule,
        {
            status: confirmStatus,
            data: confirmData,
            error: confirmError,
            reset: resetConfirm,
        },
    ] = useConfirmMonthlyDutyScheduleByMonthMutation({
        fixedCacheKey: 'shareConfirmMonthlyDutyScheduleResult',
    });

    const [
        deleteMonthlyDutySchedule,
        { status: deleteStatus, error: deleteError, reset: resetDelete },
    ] = useDeleteMonthlyDutySchedulesByMonthMutation({
        fixedCacheKey: 'shareDeleteMonthlyDutyScheduleResult',
    });

    const generateButtonOnClickHandler = () => {
        generateMonthlyDutySchedule({
            token: token || '',
            month: month || -1,
            year: year || -1,
        });
    };

    const deleteButtonOnClickHandler = () => {
        deleteMonthlyDutySchedule({
            token: token || '',
            month: month || -1,
            year: year || -1,
        });
    };

    const confirmButtonOnClickHandler = () => {
        confirmMonthlyDuetySchedule({
            token: token || '',
            month: month || -1,
            year: year || -1,
        });
    };

    useEffect(() => {
        if (deleteStatus === QueryStatus.fulfilled) {
            ToastifyController.activeSuccess(
                'Duty schedule successfully deleted.',
            );
            resetDelete();
        }

        if (deleteStatus === QueryStatus.rejected && deleteError) {
            ErrorHandler.activeToast(deleteError);
            resetDelete();
        }
    }, [deleteStatus, deleteError, resetDelete]);

    useEffect(() => {
        if (postStatus === QueryStatus.fulfilled && postData?.isSuccess) {
            ToastifyController.activeSuccess(
                'Duty schedule successfully generated.',
            );

            resetPost();
        }

        if (postStatus === QueryStatus.rejected && postError) {
            ErrorHandler.activeToast(postError);
            resetPost();
        }
    }, [postStatus, postError, postData, resetPost]);

    useEffect(() => {
        if (confirmStatus === QueryStatus.fulfilled && confirmData?.isSuccess) {
            ToastifyController.activeSuccess(
                'Duty schedule successfully confirmed.',
            );

            resetConfirm();
        }

        if (confirmStatus === QueryStatus.rejected && confirmError) {
            ErrorHandler.activeToast(confirmError);

            resetConfirm();
        }
    }, [confirmStatus, confirmData, confirmError, resetConfirm]);

    return (
        <Grid
            container
            alignItems={'center'}
            width={'100%'}
            gap={2}
        >
            <Grid
                container
                item
                md={6}
                xs={12}
                spacing={2}
            >
                <Grid
                    item
                    md
                    xs
                >
                    <MonthSelection />
                </Grid>
                <Grid
                    item
                    md
                    xs
                >
                    <YearSelection />
                </Grid>
            </Grid>
            <Grid
                container
                item
                md={5}
                xs={12}
                justifyContent={'flex-start'}
                spacing={isMediumScreen ? 2 : 1}
            >
                <Grid
                    item
                    md={'auto'}
                    sm={12}
                    xs={12}
                >
                    <PrimaryButton
                        onClickHanlder={generateButtonOnClickHandler}
                        style={{ width: isMediumScreen ? '100%' : 'auto' }}
                        disabled={monthlyDutySchedules.length > 0}
                    >
                        Generate
                    </PrimaryButton>
                </Grid>
                <Grid
                    item
                    md={'auto'}
                    sm={12}
                    xs={12}
                >
                    <PrimaryButton
                        onClickHanlder={confirmButtonOnClickHandler}
                        style={{ width: isMediumScreen ? '100%' : 'auto' }}
                        disabled={
                            isRecordConfirmed === null
                                ? true
                                : isRecordConfirmed
                        }
                    >
                        Confirm
                    </PrimaryButton>
                </Grid>
                <Grid
                    item
                    md={'auto'}
                    sm={12}
                    xs={12}
                >
                    <DangerButton
                        onClickHanlder={deleteButtonOnClickHandler}
                        style={{ width: isMediumScreen ? '100%' : 'auto' }}
                        disabled={monthlyDutySchedules.length === 0}
                    >
                        Delete
                    </DangerButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SearchMonthlyScheduleForm;
