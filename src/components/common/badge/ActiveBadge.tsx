import { Color } from '../../../constants/appTheme';
import Badge from './Badge';
import { FC } from 'react';

interface ActiveBadgeProps {
    isActive: boolean;
}

const ActiveBadge: FC<ActiveBadgeProps> = ({ isActive }) => {
    return (
        <>
            <Badge
                backgroundColor={isActive ? Color.green : Color.red}
                isOutlined={true}
                color={Color.white}
            >
                {isActive ? 'Active' : 'Inactive'}
            </Badge>
        </>
    );
};

export default ActiveBadge;
