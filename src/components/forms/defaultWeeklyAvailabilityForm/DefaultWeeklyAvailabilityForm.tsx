import {
    Box,
    Divider,
    Grid,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { Color } from '../../../constants/appTheme';
import SelectionInput, {
    SelectionOption,
} from '../../common/input/SelectionInput';
import { useAppDispatch, useAppSelector } from '../../../store/index.store';
import TimeSlotUtil from '../../../utils/timeSlot/timeSlotUtil';
import { timeSlotSliceActions } from '../../../store/timeSlotSlice/timeSlot.slice';
import { WeekDay } from '../../../constants/weekDay';
import ClearIcon from '@mui/icons-material/Clear';
import DangerButton from '../../common/buttons/DangerButton';
import PrimaryButton from '../../common/buttons/PrimaryButton';

interface WeeklyAvailableTimeSlotOptions {
    mon: SelectionOption[];
    tue: SelectionOption[];
    wed: SelectionOption[];
    thu: SelectionOption[];
    fri: SelectionOption[];
    sat: SelectionOption[];
    sun: SelectionOption[];
}

const DefaultWeeklyAvailabilityForm: FC = () => {
    const [availabileTimeSlotOptions, setAvailableTimeSlotOptions] =
        useState<WeeklyAvailableTimeSlotOptions>({
            mon: [],
            tue: [],
            wed: [],
            thu: [],
            fri: [],
            sat: [],
            sun: [],
        });

    const { availableTimeSlots, chosenTimeSlots } = useAppSelector(
        (state) => state.timeSlotSlice,
    );

    const dispatch = useAppDispatch();

    const {
        clearChosenTimeSlots,
        setChosenTimeSlots,
        clearAvailabileTimeSlots,
    } = timeSlotSliceActions;

    const availabilityTimeSlotOnChangeHandler = (
        weekDay: WeekDay,
    ): ((event: SelectChangeEvent<string>) => void) => {
        return (event) => {
            const timeSlotId = Number.parseInt(event.target.value);

            if (Number.isNaN(timeSlotId)) {
                alert('timeSlotId is NaN');

                return;
            }

            dispatch(setChosenTimeSlots({ weekDay, timeSlotId }));
        };
    };

    const availabilityTimeSlotDeleteButtonOnClickHandler = (
        weekDay: WeekDay,
    ): MouseEventHandler<HTMLButtonElement> => {
        return () => {
            dispatch(
                setChosenTimeSlots({
                    weekDay: weekDay,
                    timeSlotId: null,
                }),
            );
        };
    };

    const updateAvailabilityButtonOnClickHandler = () => {};

    const generateClearButton = (
        weekDay: WeekDay,
        availableOptions: SelectionOption[],
    ) => {
        return (
            <DangerButton
                onClickHanlder={availabilityTimeSlotDeleteButtonOnClickHandler(
                    weekDay,
                )}
                disabled={availableOptions.length === 0}
            >
                <ClearIcon />
            </DangerButton>
        );
    };

    useEffect(() => {
        const {
            mon: monAvailableTimeSlots,
            tue: tueAvailableTimeSlots,
            wed: wedAvailableTimeSlots,
            thu: thuAvailableTimeSlots,
            fri: friAvailableTimeSlots,
            sat: satAvailableTimeSlots,
            sun: sunAvailableTimeSlots,
        } = availableTimeSlots;

        setAvailableTimeSlotOptions({
            mon: TimeSlotUtil.convertTimeSlotsToSelectionOptions(
                monAvailableTimeSlots,
            ),
            tue: TimeSlotUtil.convertTimeSlotsToSelectionOptions(
                tueAvailableTimeSlots,
            ),
            wed: TimeSlotUtil.convertTimeSlotsToSelectionOptions(
                wedAvailableTimeSlots,
            ),
            thu: TimeSlotUtil.convertTimeSlotsToSelectionOptions(
                thuAvailableTimeSlots,
            ),
            fri: TimeSlotUtil.convertTimeSlotsToSelectionOptions(
                friAvailableTimeSlots,
            ),
            sat: TimeSlotUtil.convertTimeSlotsToSelectionOptions(
                satAvailableTimeSlots,
            ),
            sun: TimeSlotUtil.convertTimeSlotsToSelectionOptions(
                sunAvailableTimeSlots,
            ),
        });
    }, [availableTimeSlots]);

    useEffect(() => {
        return () => {
            dispatch(clearChosenTimeSlots());
            dispatch(clearAvailabileTimeSlots());
        };
    }, [dispatch, clearChosenTimeSlots, clearAvailabileTimeSlots]);

    return (
        <Stack
            sx={{
                backgroundColor: Color.white,
                paddingX: 5,
                paddingY: 2,
                borderRadius: 4,
                boxShadow: 5,
                gap: 2,
            }}
        >
            <Typography variant={'h6'}>Default Weekly Availability</Typography>
            <Divider variant='fullWidth' />
            {/* Default Weekley Availability Form */}
            <Grid
                container
                rowSpacing={2}
                columnSpacing={6}
            >
                <Grid
                    item
                    display='flex'
                    gap={1}
                    xs={12}
                    md={4}
                >
                    <SelectionInput
                        options={availabileTimeSlotOptions.mon}
                        value={
                            chosenTimeSlots.mon !== null &&
                            availabileTimeSlotOptions.mon.length > 0
                                ? chosenTimeSlots.mon.toString()
                                : null
                        }
                        label='Monday'
                        onChangeHandler={availabilityTimeSlotOnChangeHandler(
                            WeekDay.MON,
                        )}
                        autoDisable={true}
                    />
                    {generateClearButton(
                        WeekDay.MON,
                        availabileTimeSlotOptions.mon,
                    )}
                </Grid>
                <Grid
                    item
                    display='flex'
                    gap={1}
                    xs={12}
                    md={4}
                >
                    <SelectionInput
                        options={availabileTimeSlotOptions.tue}
                        value={
                            chosenTimeSlots.tue !== null &&
                            availabileTimeSlotOptions.tue.length > 0
                                ? chosenTimeSlots.tue.toString()
                                : null
                        }
                        label='Tuesday'
                        onChangeHandler={availabilityTimeSlotOnChangeHandler(
                            WeekDay.TUE,
                        )}
                        autoDisable={true}
                    />
                    {generateClearButton(
                        WeekDay.TUE,
                        availabileTimeSlotOptions.tue,
                    )}
                </Grid>
                <Grid
                    item
                    display='flex'
                    gap={1}
                    xs={12}
                    md={4}
                >
                    <SelectionInput
                        options={availabileTimeSlotOptions.wed}
                        value={
                            chosenTimeSlots.wed !== null &&
                            availabileTimeSlotOptions.wed.length > 0
                                ? chosenTimeSlots.wed.toString()
                                : null
                        }
                        label='Wednesday'
                        onChangeHandler={availabilityTimeSlotOnChangeHandler(
                            WeekDay.WED,
                        )}
                        autoDisable={true}
                    />
                    {generateClearButton(
                        WeekDay.WED,
                        availabileTimeSlotOptions.wed,
                    )}
                </Grid>
                <Grid
                    item
                    display='flex'
                    gap={1}
                    xs={12}
                    md={4}
                >
                    <SelectionInput
                        options={availabileTimeSlotOptions.thu}
                        value={
                            chosenTimeSlots.thu !== null &&
                            availabileTimeSlotOptions.thu.length > 0
                                ? chosenTimeSlots.thu.toString()
                                : null
                        }
                        label='Thursday'
                        onChangeHandler={availabilityTimeSlotOnChangeHandler(
                            WeekDay.THU,
                        )}
                        autoDisable={true}
                    />
                    {generateClearButton(
                        WeekDay.THU,
                        availabileTimeSlotOptions.thu,
                    )}
                </Grid>
                <Grid
                    item
                    display='flex'
                    gap={1}
                    xs={12}
                    md={4}
                >
                    <SelectionInput
                        options={availabileTimeSlotOptions.fri}
                        value={
                            chosenTimeSlots.fri !== null &&
                            availabileTimeSlotOptions.fri.length > 0
                                ? chosenTimeSlots.fri.toString()
                                : null
                        }
                        label='Friday'
                        onChangeHandler={availabilityTimeSlotOnChangeHandler(
                            WeekDay.FRI,
                        )}
                        autoDisable={true}
                    />
                    {generateClearButton(
                        WeekDay.FRI,
                        availabileTimeSlotOptions.fri,
                    )}
                </Grid>
                <Grid
                    item
                    display='flex'
                    gap={1}
                    xs={12}
                    md={4}
                >
                    <SelectionInput
                        options={availabileTimeSlotOptions.sat}
                        value={
                            chosenTimeSlots.sat !== null &&
                            availabileTimeSlotOptions.sat.length > 0
                                ? chosenTimeSlots.sat.toString()
                                : null
                        }
                        label='Saturday'
                        onChangeHandler={availabilityTimeSlotOnChangeHandler(
                            WeekDay.SAT,
                        )}
                        autoDisable={true}
                    />
                    {generateClearButton(
                        WeekDay.SAT,
                        availabileTimeSlotOptions.sat,
                    )}
                </Grid>
                <Grid
                    item
                    display='flex'
                    gap={1}
                    xs={12}
                    md={4}
                >
                    <SelectionInput
                        options={availabileTimeSlotOptions.sun}
                        value={
                            chosenTimeSlots.sun !== null &&
                            availabileTimeSlotOptions.sun.length > 0
                                ? chosenTimeSlots.sun.toString()
                                : null
                        }
                        label='Sunday'
                        onChangeHandler={availabilityTimeSlotOnChangeHandler(
                            WeekDay.SUN,
                        )}
                        autoDisable={true}
                    />
                    {generateClearButton(
                        WeekDay.SUN,
                        availabileTimeSlotOptions.sun,
                    )}
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <PrimaryButton
                    onClickHanlder={updateAvailabilityButtonOnClickHandler}
                >
                    Update Weekly Availability
                </PrimaryButton>
            </Box>
        </Stack>
    );
};

export default DefaultWeeklyAvailabilityForm;
