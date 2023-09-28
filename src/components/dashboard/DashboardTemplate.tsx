import { FC, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import DashboardNavigator from './DashboardNavigator';
import appTheme, { Color, DRAWER_WIDTH } from '../../constants/appTheme';
import { useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardFooter from './DashboardFooter';

const DashboardTemplate: FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isSmUp = useMediaQuery(appTheme.breakpoints.up('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <CssBaseline />
                <Box
                    component='nav'
                    sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
                >
                    {isSmUp ? null : (
                        <DashboardNavigator
                            PaperProps={{ style: { width: DRAWER_WIDTH } }}
                            variant='temporary'
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                        />
                    )}
                    <DashboardNavigator
                        PaperProps={{ style: { width: DRAWER_WIDTH } }}
                        sx={{ display: { sm: 'block', xs: 'none' } }}
                    />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <DashboardHeader onDrawerToggle={handleDrawerToggle} />
                    <Box
                        component='main'
                        sx={{ flex: 1, py: 1, px: 1, bgcolor: Color.grey }}
                    >
                        {<Outlet />}
                    </Box>
                    <Box>
                        <DashboardFooter />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DashboardTemplate;
