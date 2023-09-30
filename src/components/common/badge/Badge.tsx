import { Paper } from '@mui/material';
import { FC, ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    isOutlined: boolean;
    backgroundColor: string;
    color: string;
}

const Badge: FC<BadgeProps> = ({
    children,
    isOutlined,
    backgroundColor,
    color
}) => {
    return (
        <Paper
            variant={isOutlined ? 'outlined' : 'elevation'}
            elevation={4}
            sx={{
                backgroundColor: backgroundColor,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color
            }}
        >
            {children}
        </Paper>
    );
};

export default Badge;
