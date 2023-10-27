import { FC } from 'react';
import SelectionInput from '../../common/input/SelectionInput';
import { useAppDispatch, useAppSelector } from '../../../store/index.store';
import { monthlyScheduleSliceActions } from '../../../store/monthlyScheduleSice/monthlySchedule.slice';
import { SelectChangeEvent } from '@mui/material';
import ErrorHandler from '../../../utils/errorHandler';
import YearSelectionUtil from '../../../utils/yearSelection/yearSelectionUtil';

const YearSelection: FC = () => {
    const options = YearSelectionUtil.generateYearSelectionOptions();

    const { month, year } = useAppSelector(
        (state) => state.monthlyScheduleSlice.options,
    );

    const dispatch = useAppDispatch();

    const { setOptions } = monthlyScheduleSliceActions;

    const onChangeHandler = (event: SelectChangeEvent) => {
        const value = Number.parseInt(event.target.value);

        if (Number.isNaN(value)) {
            ErrorHandler.activeToast(new Error('Year is not number.'));
            return;
        }

        dispatch(
            setOptions({
                month,
                year: value,
            }),
        );
    };

    return (
        <SelectionInput
            label='Year'
            onChangeHandler={onChangeHandler}
            value={year?.toString() || null}
            options={options}
        />
    );
};

export default YearSelection;
