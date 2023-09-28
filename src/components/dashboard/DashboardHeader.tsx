import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import ProfileImageHolder from '../profileImageHolder/ProfileImageHolder';
import { useAppSelector } from '../../store/index.store';

interface HeaderProps {
    onDrawerToggle: () => void;
}

const DashboardHeader: FC<HeaderProps> = (props) => {
    const { onDrawerToggle } = props;

    const { pageTitle } = useAppSelector((state) => state.dashboardSlice);

    return (
        <>
            <AppBar
                color='primary'
                position='sticky'
                elevation={0}
            >
                <Toolbar>
                    <Grid
                        container
                        spacing={1}
                        alignItems='center'
                    >
                        <Grid
                            sx={{ display: { sm: 'none', xs: 'block' } }}
                            item
                        >
                            <IconButton
                                color='inherit'
                                aria-label='open drawer'
                                onClick={onDrawerToggle}
                                edge='start'
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid
                            item
                            xs
                        >
                            <Typography
                                color='inherit'
                                variant='h5'
                                component='h1'
                            >
                                {pageTitle}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs
                        />
                        <Grid item>
                            <Tooltip title='Alerts • No alerts'>
                                <IconButton color='inherit'>
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <ProfileImageHolder source='/static/images/avatar/1.jpg' />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {/* <AppBar
                component='div'
                position='static'
                elevation={0}
                sx={{ zIndex: 0 }}
            >
                <Tabs
                    value={0}
                    textColor='inherit'
                >
                    <Tab label='Users' />
                    <Tab label='Sign-in method' />
                    <Tab label='Templates' />
                    <Tab label='Usage' />
                </Tabs>
            </AppBar> */}
        </>
    );
};

export default DashboardHeader;
