import { FC, useEffect } from 'react';
import { useAppDispatch } from '../store/index.store';
import { dashboardSliceActions } from '../store/dashboardSlice/dashboard.slice';
import { PageTitle } from '../constants/pageTitle';

const MonthlyDutySchedulePage: FC = () => {
    const dispatch = useAppDispatch();

    const { setPageTitle } = dashboardSliceActions;

    useEffect(() => {
        dispatch(setPageTitle(PageTitle.MONTHLY_DUTY_SCHEDULE));
    }, [dispatch, setPageTitle]);

    return <></>;
};

export default MonthlyDutySchedulePage;
