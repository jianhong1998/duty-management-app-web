import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { FC } from 'react';
import EmployeeForm from '../../../forms/employeeForm/EmployeeForm';
import { useAppSelector } from '../../../../store/index.store';

const UpdateEmployeeFormPopup: FC = () => {
    const { isOpen } = useAppSelector(
        (state) => state.employeeFormSlice.updateEmployeeFormPopup,
    );

    return (
        <Dialog
            open={isOpen}
            maxWidth='md'
            fullWidth
        >
            <DialogTitle>Update Employee Details</DialogTitle>
            <DialogContent>
                <Box padding={1}>
                    <EmployeeForm />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateEmployeeFormPopup;
