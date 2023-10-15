import { FC, useEffect } from 'react';
import { dashboardSliceActions } from '../store/dashboardSlice/dashboard.slice';
import { useAppDispatch } from '../store/index.store';
import EmployeeForm from '../components/forms/employeeForm/EmployeeForm';
import { Box } from '@mui/material';
import { Color } from '../constants/appTheme';
import { PageTitle } from '../constants/pageTitle';

const AddEmployeePage: FC = () => {
    const dispatch = useAppDispatch();

    const { setPageTitle } = dashboardSliceActions;

    useEffect(() => {
        dispatch(setPageTitle(PageTitle.NEW_EMPLOYEE));
    }, [dispatch, setPageTitle]);

    return (
        <Box
            component='main'
            sx={{ backgroundColor: Color.white }}
            padding={4}
            margin={1}
            borderRadius={4}
        >
            <EmployeeForm />
        </Box>
    );
};

export default AddEmployeePage;
