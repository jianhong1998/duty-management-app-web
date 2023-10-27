import { SxProps, Theme } from '@mui/material';
import { FC, MouseEventHandler, ReactNode } from 'react';
import MuiButton from './MuiButton';

interface DangerButtonProps {
    children: ReactNode;
    onClickHanlder: MouseEventHandler<HTMLButtonElement>;
    style?: SxProps<Theme>;
    disabled?: boolean;
    helperText?: string;
    isContained?: boolean;
}

const DangerButton: FC<DangerButtonProps> = ({
    children,
    onClickHanlder,
    style,
    disabled,
    helperText,
    isContained,
}) => {
    return (
        <MuiButton
            props={{
                children,
                disabled,
                onClick: onClickHanlder,
                sx: style,
                variant: isContained ? 'contained' : 'outlined',
                color: 'error',
            }}
            helperText={helperText}
        />
    );
};

export default DangerButton;
