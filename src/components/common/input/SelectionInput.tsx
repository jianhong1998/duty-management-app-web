import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { FC } from 'react';
import { IInputFieldError } from '../../../models/error/inputFieldError.model';

export type SelectionOption = {
    value: string;
    label: string;
};

type SelectionInputProps = {
    options: SelectionOption[];
    value: string | null;
    onChangeHandler: (event: SelectChangeEvent<string>) => void;
    label: string;
    error?: IInputFieldError;
    autoDisable?: boolean;
};

const SelectionInput: FC<SelectionInputProps> = ({
    options,
    value,
    onChangeHandler,
    label,
    error,
    autoDisable,
}) => {
    const labelId = `${label.split(' ').join('-')}-label`;

    return (
        <FormControl
            fullWidth
            error={error?.isError}
        >
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                label={label}
                value={value || ''}
                onChange={onChangeHandler}
                variant='outlined'
                fullWidth
                disabled={autoDisable && options.length === 0}
            >
                {options.map((option) => (
                    <MenuItem
                        value={option.value}
                        key={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {error?.isError && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
    );
};

export default SelectionInput;
