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
import { useAppDispatch, useAppSelector } from '../../store/index.store';
import { loginSliceActions } from '../../store/loginSlice/login.slice';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    onDrawerToggle: () => void;
}

const DashboardHeader: FC<HeaderProps> = (props) => {
    const { onDrawerToggle } = props;

    const { pageTitle } = useAppSelector((state) => state.dashboardSlice);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { setTokenAndUsername } = loginSliceActions;

    const logout = () => {
        localStorage.clear();

        dispatch(
            setTokenAndUsername({
                token: null,
                username: null
            })
        );

        navigate('/login');
    };

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
                            <ProfileImageHolder
                                source=''
                                onClick={logout}
                            />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default DashboardHeader;
