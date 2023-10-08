import { IconButton, Avatar } from '@mui/material';
import { FC } from 'react';
import { useAppSelector } from '../../store/index.store';

interface ProfileImageHolderProps {
    source: string;
    onClick?: () => void;
}

const ProfileImageHolder: FC<ProfileImageHolderProps> = ({
    source,
    onClick,
}) => {
    const { username } = useAppSelector((state) => state.loginSlice);

    return (
        <IconButton
            color='inherit'
            sx={{ p: 0.5 }}
            onClick={onClick}
        >
            <Avatar
                src={source}
                alt={username || 'User'}
            />
        </IconButton>
    );
};

export default ProfileImageHolder;
