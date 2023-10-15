import { Button, ButtonProps, Tooltip } from '@mui/material';
import { FC } from 'react';

interface MuiButtonProps {
    props: ButtonProps;
    helperText?: string;
}

const MuiButton: FC<MuiButtonProps> = ({ props, helperText }) => {
    return (
        <>
            {helperText && (
                <Tooltip
                    title={helperText}
                    arrow
                    enterDelay={500}
                >
                    <Button {...props}>{props.children}</Button>
                </Tooltip>
            )}

            {!helperText && <Button {...props}>{props.children}</Button>}
        </>
    );
};

export default MuiButton;
