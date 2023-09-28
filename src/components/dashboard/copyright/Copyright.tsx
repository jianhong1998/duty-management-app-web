import { FC } from 'react';
import {
    COPYRIGHT_NAME,
    COPYRIGHT_WEBSITE_URL
} from '../../../constants/copyrightContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright: FC = () => {
    return (
        <Typography
            variant='body2'
            color='text.secondary'
            align='center'
        >
            {'Copyright © '}
            <Link
                color='inherit'
                href={COPYRIGHT_WEBSITE_URL}
                underline='always'
                sx={{
                    ':hover': {
                        fontWeight: 700
                    }
                }}
            >
                {COPYRIGHT_NAME}
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
};

export default Copyright;
