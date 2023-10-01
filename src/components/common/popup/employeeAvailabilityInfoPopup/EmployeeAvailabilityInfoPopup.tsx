import { FC, useEffect } from 'react';
import { IEmployee } from '../../../../models/employee/employee.model';
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
    Typography
} from '@mui/material';
import { useGetTimeSlotQuery } from '../../../../store/timeSlotSlice/timeSlot.api';
import { useAppSelector } from '../../../../store/index.store';
import EmployeeAvailabilityTableRow from './EmployeeAvailabilityTableRow';
import ErrorHandler from '../../../../utils/errorHandler';
import { useDispatch } from 'react-redux';
import { loadingSliceActions } from '../../../../store/loadingSlice/loading.slice';
import PrimaryButton from '../../buttons/PrimaryButton';

interface EmployeeAvailabilityInfoPopupProps {
    employeeName: string;
    availabilityIds: IEmployee['weeklyAvailabilityTimeSlotIds'];
    isOpen: boolean;
    closePopupFn: () => void;
}

const EmployeeAvailabilityInfoPopup: FC<EmployeeAvailabilityInfoPopupProps> = ({
    employeeName,
    availabilityIds,
    isOpen,
    closePopupFn
}) => {
    const { token } = useAppSelector((state) => state.loginSlice);

    const dispatch = useDispatch();

    const { openLoading, closeLoading } = loadingSliceActions;

    const {
        data: mondayData,
        isLoading: isMondayDataLoading,
        isError: isMondayDataError,
        error: mondayError
    } = useGetTimeSlotQuery({
        token: token || '',
        timeSlotId: availabilityIds.mon || 0
    });

    const {
        data: tuesdayData,
        isLoading: isTuesdayDataLoading,
        isError: isTuesdayDataError,
        error: tuesdayError
    } = useGetTimeSlotQuery({
        token: token || '',
        timeSlotId: availabilityIds.tue || 0
    });

    const {
        data: wednesdayData,
        isLoading: isWednesdayDataLoading,
        isError: isWednesdayDataError,
        error: wednesdayError
    } = useGetTimeSlotQuery({
        token: token || '',
        timeSlotId: availabilityIds.wed || 0
    });

    const {
        data: thusdayData,
        isLoading: isThusdayDataLoading,
        isError: isThusdayDataError,
        error: thusdayError
    } = useGetTimeSlotQuery({
        token: token || '',
        timeSlotId: availabilityIds.thu || 0
    });

    const {
        data: fridayData,
        isLoading: isFridayDataLoading,
        isError: isFridayDataError,
        error: fridayError
    } = useGetTimeSlotQuery({
        token: token || '',
        timeSlotId: availabilityIds.fri || 0
    });

    const {
        data: saturdayData,
        isLoading: isSaturdayDataLoading,
        isError: isSaturdayDataError,
        error: saturdayError
    } = useGetTimeSlotQuery({
        token: token || '',
        timeSlotId: availabilityIds.sat || 0
    });

    const {
        data: sundayData,
        isLoading: isSundayDataLoading,
        isError: isSundayDataError,
        error: sundayError
    } = useGetTimeSlotQuery({
        token: token || '',
        timeSlotId: availabilityIds.sun || 0
    });

    useEffect(() => {
        if (isMondayDataError) {
            ErrorHandler.activeToast(mondayError);
        }

        if (isTuesdayDataError) {
            ErrorHandler.activeToast(tuesdayError);
        }

        if (isWednesdayDataError) {
            ErrorHandler.activeToast(wednesdayError);
        }

        if (isThusdayDataError) {
            ErrorHandler.activeToast(thusdayError);
        }

        if (isFridayDataError) {
            ErrorHandler.activeToast(fridayError);
        }

        if (isSaturdayDataError) {
            ErrorHandler.activeToast(saturdayError);
        }

        if (isSundayDataError) {
            ErrorHandler.activeToast(sundayError);
        }
    }, [
        isMondayDataError,
        isTuesdayDataError,
        isWednesdayDataError,
        isThusdayDataError,
        isFridayDataError,
        isSaturdayDataError,
        isSundayDataError,
        mondayError,
        tuesdayError,
        wednesdayError,
        thusdayError,
        fridayError,
        saturdayError,
        sundayError
    ]);

    useEffect(() => {
        if (
            isMondayDataLoading ||
            isTuesdayDataLoading ||
            isWednesdayDataLoading ||
            isThusdayDataLoading ||
            isFridayDataLoading ||
            isSaturdayDataLoading ||
            isSundayDataLoading
        ) {
            dispatch(openLoading());
        } else {
            dispatch(closeLoading());
        }
    }, [
        isMondayDataLoading,
        isTuesdayDataLoading,
        isWednesdayDataLoading,
        isThusdayDataLoading,
        isFridayDataLoading,
        isSaturdayDataLoading,
        isSundayDataLoading,
        dispatch,
        openLoading,
        closeLoading
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
                        <EmployeeAvailabilityTableRow
                            weekday='Monday'
                            startTime={
                                availabilityIds.mon && mondayData?.isSuccess
                                    ? new Date(mondayData.data.startTime)
                                    : '-'
                            }
                            endTime={
                                availabilityIds.mon && mondayData?.isSuccess
                                    ? new Date(mondayData.data.endTime)
                                    : '-'
                            }
                        />
                        <EmployeeAvailabilityTableRow
                            weekday='Tuesday'
                            startTime={
                                availabilityIds.tue && tuesdayData?.isSuccess
                                    ? new Date(tuesdayData.data.startTime)
                                    : '-'
                            }
                            endTime={
                                availabilityIds.tue && tuesdayData?.isSuccess
                                    ? new Date(tuesdayData.data.endTime)
                                    : '-'
                            }
                        />
                        <EmployeeAvailabilityTableRow
                            weekday='Wednesday'
                            startTime={
                                availabilityIds.wed && wednesdayData?.isSuccess
                                    ? new Date(wednesdayData.data.startTime)
                                    : '-'
                            }
                            endTime={
                                availabilityIds.wed && wednesdayData?.isSuccess
                                    ? new Date(wednesdayData.data.endTime)
                                    : '-'
                            }
                        />
                        <EmployeeAvailabilityTableRow
                            weekday='Thusday'
                            startTime={
                                availabilityIds.thu && thusdayData?.isSuccess
                                    ? new Date(thusdayData.data.startTime)
                                    : '-'
                            }
                            endTime={
                                availabilityIds.thu && thusdayData?.isSuccess
                                    ? new Date(thusdayData.data.endTime)
                                    : '-'
                            }
                        />
                        <EmployeeAvailabilityTableRow
                            weekday='Friday'
                            startTime={
                                availabilityIds.fri && fridayData?.isSuccess
                                    ? new Date(fridayData.data.startTime)
                                    : '-'
                            }
                            endTime={
                                availabilityIds.fri && fridayData?.isSuccess
                                    ? new Date(fridayData.data.endTime)
                                    : '-'
                            }
                        />
                        <EmployeeAvailabilityTableRow
                            weekday='Saturday'
                            startTime={
                                availabilityIds.sat && saturdayData?.isSuccess
                                    ? new Date(saturdayData.data.startTime)
                                    : '-'
                            }
                            endTime={
                                availabilityIds.sat && saturdayData?.isSuccess
                                    ? new Date(saturdayData.data.endTime)
                                    : '-'
                            }
                        />
                        <EmployeeAvailabilityTableRow
                            weekday='Sunday'
                            startTime={
                                availabilityIds.sun && sundayData?.isSuccess
                                    ? new Date(sundayData.data.startTime)
                                    : '-'
                            }
                            endTime={
                                availabilityIds.sun && sundayData?.isSuccess
                                    ? new Date(sundayData.data.endTime)
                                    : '-'
                            }
                        />
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
