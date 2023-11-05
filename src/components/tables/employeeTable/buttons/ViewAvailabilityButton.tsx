import { FC, MouseEventHandler } from 'react';
import PrimaryButton from '../../../common/buttons/PrimaryButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface ViewAvailabilityButtonProps {
    openAvailabilityInfoPopupFn: () => void;
}

const ViewAvailabilityButton: FC<ViewAvailabilityButtonProps> = ({
    openAvailabilityInfoPopupFn,
}) => {
    const viewAvailabilityButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        openAvailabilityInfoPopupFn();
    };

    return (
        <PrimaryButton
            onClickHanlder={viewAvailabilityButtonOnClickHandler}
            helperText='View Availability'
        >
            <VisibilityIcon />
        </PrimaryButton>
    );
};

export default ViewAvailabilityButton;
