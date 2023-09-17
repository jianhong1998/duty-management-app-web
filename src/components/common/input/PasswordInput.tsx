import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from '@mui/material';
import {
    ChangeEventHandler,
    FC,
    KeyboardEventHandler,
    MouseEventHandler,
    useState
} from 'react';

interface PasswordInputProps {
    label: string;
    id: string;
    value: string;
    onChangeHandler: ChangeEventHandler<HTMLInputElement>;
    enterOnPressHandler?: () => void;
    classes?: string[];
}

const PasswordInput: FC<PasswordInputProps> = ({
    label,
    classes,
    id,
    value,
    onChangeHandler,
    enterOnPressHandler
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword: MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        event.preventDefault();
    };

    const getClassName = (): string => {
        let classNameString = '';

        classes?.forEach((className, index) => {
            classNameString +=
                className + `${index < classes.length ? ' ' : ''}`;
        });

        return classNameString;
    };

    const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = (
        event
    ) => {
        if (enterOnPressHandler && event.key === 'Enter') {
            enterOnPressHandler();
        }
    };

    return (
        <>
            <FormControl
                fullWidth
                className={getClassName()}
                sx={{ m: 1 }}
                variant='outlined'
            >
                <InputLabel htmlFor={id}>{label}</InputLabel>
                <OutlinedInput
                    id={id}
                    label={label}
                    value={value}
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge='end'
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </>
    );
};

export default PasswordInput;
