import { Button, SxProps, Theme } from '@mui/material';
import { FC, MouseEventHandler, ReactNode } from 'react';

interface PrimaryButtonProps {
    children: ReactNode;
    onClickHanlder: MouseEventHandler<HTMLButtonElement>;
    style?: SxProps<Theme>;
    disabled?: boolean;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
    children,
    onClickHanlder,
    style,
    disabled
}) => {
    return (
        <>
            <Button
                variant='contained'
                color='primary'
                onClick={onClickHanlder}
                disabled={disabled}
                sx={style}
            >
                {children}
            </Button>
        </>
    );
};

export default PrimaryButton;
