import { Box, Button, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/index.store';
import { dashboardSliceActions } from '../store/dashboardSlice/dashboard.slice';

const NotFoundPage: FC = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { setPageTitle } = dashboardSliceActions;

    const backToHomeButtonOnClickHandler = () => {
        navigate('/');
    };

    useEffect(() => {
        dispatch(setPageTitle(''));
    }, [dispatch, setPageTitle]);

    return (
        <>
            <Box
                component='main'
                sx={{
                    borderRadius: 4,
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                height={'100%'}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                    }}
                >
                    <Box width={'100%'}>
                        <Typography
                            variant='h3'
                            textAlign={'center'}
                        >
                            Page Not Found
                        </Typography>
                    </Box>
                    <Box mt={5}>
                        <Button
                            variant='contained'
                            onClick={backToHomeButtonOnClickHandler}
                            size='large'
                        >
                            Back to Home
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default NotFoundPage;
