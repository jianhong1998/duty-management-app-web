import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FC, MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/index.store';
import { loginSliceActions } from '../../store/loginSlice/login.slice';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import DangerButton from '../common/buttons/DangerButton';
import { popupSliceActions } from '../../store/popupSlice/popupSlice';
import Popup from '../common/popup/MessagePopup';

interface HeaderProps {
    onDrawerToggle: () => void;
}

const DashboardHeader: FC<HeaderProps> = (props) => {
    const { onDrawerToggle } = props;

    const { pageTitle } = useAppSelector((state) => state.dashboardSlice);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { clear: clearLoginSlice } = loginSliceActions;
    const { openPopup } = popupSliceActions;

    const logout = () => {
        localStorage.clear();

        dispatch(clearLoginSlice());

        navigate('/login');
    };

    const logoutButonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        dispatch(
            openPopup({
                title: 'Are you sure',
                content: 'You will be loging out from the app.',
            }),
        );
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
                            sx={{
                                display: {
                                    md: 'none',
                                    sm: 'block',
                                    xs: 'block',
                                },
                            }}
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
                            <DangerButton
                                onClickHanlder={logoutButonOnClickHandler}
                                isContained={true}
                            >
                                <LogoutIcon />
                            </DangerButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Popup
                enableCloseButton
                closeButtonTitle='Cancel'
                enableProceedButton
                proceedButtonFn={logout}
                proceedButtonTitle='Logout'
            />
        </>
    );
};

export default DashboardHeader;
