import { FC } from 'react';
import LoginForm from '../components/forms/loginForm/LoginForm';
import { Stack, Typography } from '@mui/material';

const LoginPage: FC = () => {
    return (
        <Stack
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '96vh',
            }}
            gap={5}
        >
            <Typography
                variant='h5'
                color={'primary'}
            >
                Welcome to DutySimple
            </Typography>
            <LoginForm />
        </Stack>
    );
};

export default LoginPage;
