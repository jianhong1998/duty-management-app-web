import { SelectChangeEvent } from '@mui/material';
import { FC } from 'react';
import SelectionInput, {
    SelectionOption,
} from '../../../common/input/SelectionInput';

interface ManualMonthSelectionProps {
    onChangeHandler: (event: SelectChangeEvent) => void;
    value: number;
}

const ManualMonthSelection: FC<ManualMonthSelectionProps> = ({
    onChangeHandler,
    value,
}) => {
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

    return (
        <SelectionInput
            label='Month'
            onChangeHandler={onChangeHandler}
            value={value.toString()}
            options={options}
        />
    );
};

export default ManualMonthSelection;
