import { IconButton, Avatar } from '@mui/material';
import { FC } from 'react';

interface ProfileImageHolderProps {
    source: string;
}

const ProfileImageHolder: FC<ProfileImageHolderProps> = ({ source }) => {
    return (
        <IconButton
            color='inherit'
            sx={{ p: 0.5 }}
        >
            <Avatar
                src={source}
                alt='My Avatar'
            />
        </IconButton>
    );
};

export default ProfileImageHolder;
