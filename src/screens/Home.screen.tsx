import { FC, useEffect } from 'react';
import { useAppDispatch } from '../store/index.store';
import { dashboardSliceActions } from '../store/dashboardSlice/dashboard.slice';
import { PageTitle } from '../constants/pageTitle';

const HomePage: FC = () => {
    const dispatch = useAppDispatch();

    const { setPageTitle } = dashboardSliceActions;

    useEffect(() => {
        dispatch(setPageTitle(PageTitle.HOME));
    }, [dispatch, setPageTitle]);

    return (
        <>
            <h1>Home</h1>
        </>
    );
};

export default HomePage;
