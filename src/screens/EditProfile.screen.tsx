import { FC, useEffect } from 'react';
import { dashboardSliceActions } from '../store/dashboardSlice/dashboard.slice';
import { useAppDispatch } from '../store/index.store';
import { PageTitle } from '../constants/pageTitle';

const EditProfile: FC = () => {
    const dispatch = useAppDispatch();

    const { setPageTitle } = dashboardSliceActions;

    useEffect(() => {
        dispatch(setPageTitle(PageTitle.EDIT_PROFILE));
    });

    return <></>;
};

export default EditProfile;
