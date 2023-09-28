import { FC } from 'react';
import { Box } from '@mui/material';
import { Color } from '../../constants/appTheme';
import Copyright from './copyright/Copyright';

const DashboardFooter: FC = () => {
    return (
        <Box
            component='footer'
            sx={{ p: 2, bgcolor: Color.grey }}
        >
            <Copyright />
        </Box>
    );
};

export default DashboardFooter;
