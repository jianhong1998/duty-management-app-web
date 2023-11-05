import { FC, MouseEventHandler } from 'react';
import { useAppDispatch } from '../../../../store/index.store';
import { employeeFormSliceActions } from '../../../../store/employeeFormSlice/employeeForm.slice';
import SecondaryButton from '../../../common/buttons/SecondaryButton';
import EditNoteIcon from '@mui/icons-material/EditNote';

interface EditEmployeeButtonProps {
    employeeId: number;
}

const EditEmployeeButton: FC<EditEmployeeButtonProps> = ({ employeeId }) => {
    const dispatch = useAppDispatch();

    const { openUpdateEmployeeFormPopup } = employeeFormSliceActions;

    const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(openUpdateEmployeeFormPopup(employeeId));
    };

    return (
        <SecondaryButton
            onClickHanlder={onClickHandler}
            helperText='Edit Employee'
        >
            <EditNoteIcon />
        </SecondaryButton>
    );
};

export default EditEmployeeButton;
