import { SelectChangeEvent } from '@mui/material';
import { FC } from 'react';
import SelectionInput from '../../../common/input/SelectionInput';
import YearSelectionUtil from '../../../../utils/yearSelection/yearSelectionUtil';

interface ManualYearSelectionProps {
    onChangeHandler: (event: SelectChangeEvent) => void;
    value: number;
}

const ManualYearSelection: FC<ManualYearSelectionProps> = ({
    onChangeHandler,
    value,
}) => {
    const options = YearSelectionUtil.generateYearSelectionOptions();

    return (
        <SelectionInput
            label='Year'
            onChangeHandler={onChangeHandler}
            value={value.toString()}
            options={options}
        />
    );
};

export default ManualYearSelection;
