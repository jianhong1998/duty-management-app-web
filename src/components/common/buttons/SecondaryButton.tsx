import { Button, SxProps, Theme } from '@mui/material';
import { FC, MouseEventHandler, ReactNode } from 'react';

interface SecondaryButtonProps {
    children: ReactNode;
    onClickHanlder: MouseEventHandler<HTMLButtonElement>;
    style?: SxProps<Theme>;
    disabled?: boolean;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({
    children,
    onClickHanlder,
    style,
    disabled,
}) => {
    return (
        <>
            <Button
                variant='outlined'
                color='secondary'
                onClick={onClickHanlder}
                disabled={disabled}
                sx={style}
            >
                {children}
            </Button>
        </>
    );
};

export default SecondaryButton;
