import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/index.store';
import { monthlyScheduleSliceActions } from '../../../store/monthlyScheduleSice/monthlySchedule.slice';
import { SelectChangeEvent } from '@mui/material';
import ErrorHandler from '../../../utils/errorHandler';
import SelectionInput, {
    SelectionOption,
} from '../../common/input/SelectionInput';

const MonthSelection: FC = () => {
    const options: SelectionOption[] = [
        { label: 'Jan', value: '1' },
        { label: 'Feb', value: '2' },
        { label: 'Mar', value: '3' },
        { label: 'Apr', value: '4' },
        { label: 'May', value: '5' },
        { label: 'Jun', value: '6' },
        { label: 'Jul', value: '7' },
        { label: 'Aug', value: '8' },
        { label: 'Sep', value: '9' },
        { label: 'Oct', value: '10' },
        { label: 'Nov', value: '11' },
        { label: 'Dec', value: '12' },
    ];

    const { month, year } = useAppSelector(
        (state) => state.monthlyScheduleSlice.options,
    );

    const dispatch = useAppDispatch();

    const { setOptions } = monthlyScheduleSliceActions;

    const onChangeHandler = (event: SelectChangeEvent) => {
        const value = Number.parseInt(event.target.value);

        if (Number.isNaN(value)) {
            ErrorHandler.activeToast(new Error('Month is not number.'));
            return;
        }

        dispatch(
            setOptions({
                year,
                month: value,
            }),
        );
    };

    return (
        <SelectionInput
            label='Month'
            onChangeHandler={onChangeHandler}
            value={month?.toString() || null}
            options={options}
        />
    );
};

export default MonthSelection;
