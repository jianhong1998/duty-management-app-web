import { FC, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useAppSelector } from '../../../../store/index.store';
import EmployeeAvailabilityTableRow from './EmployeeAvailabilityTableRow';
import ErrorHandler from '../../../../utils/errorHandler';
import { useDispatch } from 'react-redux';
import { loadingSliceActions } from '../../../../store/loadingSlice/loading.slice';
import PrimaryButton from '../../buttons/PrimaryButton';
import { useGetEmployeeDefaultWeeklyTimeSlotsQuery } from '../../../../store/api/employeeTimeSlot.api';
import weekDayMap from '../../../../constants/weekdayMap';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';

interface EmployeeAvailabilityInfoPopupProps {
    employeeName: string;
    employeeId: number;
    isOpen: boolean;
    closePopupFn: () => void;
}

const EmployeeAvailabilityInfoPopup: FC<EmployeeAvailabilityInfoPopupProps> = ({
    employeeName,
    employeeId,
    isOpen,
    closePopupFn,
}) => {
    const { token } = useAppSelector((state) => state.loginSlice);

    const dispatch = useDispatch();

    const { openLoading, closeLoading } = loadingSliceActions;

    const {
        status: getEmployeeDefaultWeeklytimeSlotsStatus,
        data: employeeDefaultWeeklyTimeSlots,
        error: getEmployeeDefaultWeeklytimeSlotsError,
    } = useGetEmployeeDefaultWeeklyTimeSlotsQuery(
        {
            token: token!,
            employeeId,
        },
        {
            skip: token === null || employeeId === 0,
            pollingInterval: 10 * 1000,
            refetchOnMountOrArgChange: true,
        },
    );

    useEffect(() => {
        if (getEmployeeDefaultWeeklytimeSlotsStatus === QueryStatus.pending) {
            dispatch(openLoading());
        } else {
            dispatch(closeLoading());
        }

        if (
            getEmployeeDefaultWeeklytimeSlotsStatus === QueryStatus.rejected &&
            typeof getEmployeeDefaultWeeklytimeSlotsError !== 'undefined'
        ) {
            ErrorHandler.activeToast(getEmployeeDefaultWeeklytimeSlotsError);
        }
    }, [
        getEmployeeDefaultWeeklytimeSlotsStatus,
        getEmployeeDefaultWeeklytimeSlotsError,
        dispatch,
        openLoading,
        closeLoading,
    ]);

    return (
        <Dialog
            open={isOpen}
            onClose={closePopupFn}
        >
            <DialogTitle>Default Weekly Availability</DialogTitle>
            <DialogContent>
                <Typography variant='h5'>{employeeName}</Typography>
                <hr />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Day</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employeeDefaultWeeklyTimeSlots &&
                        employeeDefaultWeeklyTimeSlots.isSuccess
                            ? Object.entries(
                                  employeeDefaultWeeklyTimeSlots.data,
                              ).map(([key, value], index) => (
                                  <EmployeeAvailabilityTableRow
                                      key={index}
                                      weekday={weekDayMap.get(key) || ''}
                                      startTime={
                                          value === null
                                              ? '-'
                                              : new Date(
                                                    `2023-01-01T${value.startTime}+08:00`,
                                                )
                                      }
                                      endTime={
                                          value === null
                                              ? '-'
                                              : new Date(
                                                    `2023-01-01T${value.endTime}+08:00`,
                                                )
                                      }
                                  />
                              ))
                            : null}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <PrimaryButton onClickHanlder={closePopupFn}>
                    Close
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
};

export default EmployeeAvailabilityInfoPopup;
