import { IconButton, Avatar } from '@mui/material';
import { FC } from 'react';

interface ProfileImageHolderProps {
    source: string;
    onClick?: () => void;
}

const ProfileImageHolder: FC<ProfileImageHolderProps> = ({
    source,
    onClick
}) => {
    return (
        <IconButton
            color='inherit'
            sx={{ p: 0.5 }}
            onClick={onClick}
        >
            <Avatar
                src={source}
                alt='My Avatar'
            />
        </IconButton>
    );
};

export default ProfileImageHolder;
