import { SxProps, Theme } from '@mui/material';
import { FC, MouseEventHandler, ReactNode } from 'react';
import MuiButton from './MuiButton';

interface DangerButtonProps {
    children: ReactNode;
    onClickHanlder: MouseEventHandler<HTMLButtonElement>;
    style?: SxProps<Theme>;
    disabled?: boolean;
    helperText?: string;
}

const DangerButton: FC<DangerButtonProps> = ({
    children,
    onClickHanlder,
    style,
    disabled,
    helperText,
}) => {
    return (
        // <Button
        //     variant='outlined'
        //     color='error'
        //     onClick={onClickHanlder}
        //     disabled={disabled}
        //     sx={style}
        // >
        //     {children}
        // </Button>

        <MuiButton
            props={{
                children,
                disabled,
                onClick: onClickHanlder,
                sx: style,
                variant: 'outlined',
                color: 'error',
            }}
            helperText={helperText}
        />
    );
};

export default DangerButton;
