import { SxProps, Theme } from '@mui/material';
import { FC, MouseEventHandler, ReactNode } from 'react';
import MuiButton from './MuiButton';

interface SecondaryButtonProps {
    children: ReactNode;
    onClickHanlder: MouseEventHandler<HTMLButtonElement>;
    style?: SxProps<Theme>;
    disabled?: boolean;
    helperText?: string;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({
    children,
    onClickHanlder,
    style,
    disabled,
    helperText,
}) => {
    return (
        <MuiButton
            props={{
                onClick: onClickHanlder,
                children,
                sx: style,
                disabled,
                variant: 'outlined',
                color: 'secondary',
            }}
            helperText={helperText}
        />
    );
};

export default SecondaryButton;
