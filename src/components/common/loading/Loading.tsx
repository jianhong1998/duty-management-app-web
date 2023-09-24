import { Backdrop, CircularProgress } from '@mui/material';
import { FC } from 'react';
import { useAppSelector } from '../../../store/index.store';

const Loading: FC = () => {
    const { isLoading } = useAppSelector((state) => state.loadingSlice);

    return (
        <>
            <Backdrop
                open={isLoading}
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
            >
                <CircularProgress />
            </Backdrop>
        </>
    );
};

export default Loading;
