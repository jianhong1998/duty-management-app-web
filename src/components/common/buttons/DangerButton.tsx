import { Button, SxProps, Theme } from '@mui/material';
import { FC, MouseEventHandler, ReactNode } from 'react';

interface DangerButtonProps {
    children: ReactNode;
    onClickHanlder: MouseEventHandler<HTMLButtonElement>;
    style?: SxProps<Theme>;
    disabled?: boolean;
}

const DangerButton: FC<DangerButtonProps> = ({
    children,
    onClickHanlder,
    style,
    disabled
}) => {
    return (
        <Button
            variant='outlined'
            color='error'
            onClick={onClickHanlder}
            disabled={disabled}
            sx={style}
        >
            {children}
        </Button>
    );
};

export default DangerButton;
