import { TextField } from '@mui/material';
import { ChangeEventHandler, FC } from 'react';
import { IInputFieldError } from '../../../models/error/inputFieldError.model';

interface TextInputProps {
    value: string;
    label: string;
    onChangeFn: ChangeEventHandler<HTMLInputElement>;
    error?: IInputFieldError;
}

const TextInput: FC<TextInputProps> = ({ value, label, onChangeFn, error }) => {
    return (
        <TextField
            value={value}
            label={label}
            onChange={onChangeFn}
            variant='outlined'
            error={error?.isError}
            helperText={error?.isError ? error?.message || '' : ''}
            fullWidth
        />
    );
};

export default TextInput;
