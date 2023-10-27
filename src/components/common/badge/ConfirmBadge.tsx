import { FC } from 'react';
import Badge from './Badge';
import { Color } from '../../../constants/appTheme';

interface ConfirmBadgeProps {
    isConfirmed: boolean;
}

const ConfirmBadge: FC<ConfirmBadgeProps> = ({ isConfirmed }) => {
    return (
        <Badge
            backgroundColor={isConfirmed ? Color.green : Color.red}
            isOutlined={true}
            color={Color.white}
        >
            {isConfirmed ? 'Confirmed' : 'Not Confirmed'}
        </Badge>
    );
};

export default ConfirmBadge;
