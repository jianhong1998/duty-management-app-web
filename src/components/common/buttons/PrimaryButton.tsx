import { SxProps, Theme } from '@mui/material';
import { FC, MouseEventHandler, ReactNode } from 'react';
import MuiButton from './MuiButton';

interface PrimaryButtonProps {
    children: ReactNode;
    onClickHanlder: MouseEventHandler<HTMLButtonElement>;
    style?: SxProps<Theme>;
    disabled?: boolean;
    helperText?: string;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
    children,
    onClickHanlder,
    style,
    disabled,
    helperText,
}) => {
    return (
        <MuiButton
            props={{
                children,
                onClick: onClickHanlder,
                sx: style,
                disabled,
                variant: 'contained',
                color: 'primary',
            }}
            helperText={helperText}
        />
    );
};

export default PrimaryButton;
