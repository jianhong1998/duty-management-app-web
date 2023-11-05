import { Typography } from '@mui/material';
import { FC } from 'react';

interface EmployeeTableHeaderProps {
    headerName: string;
}

const EmployeeTableHeader: FC<EmployeeTableHeaderProps> = ({ headerName }) => {
    return <Typography fontWeight={700}>{headerName}</Typography>;
};

export default EmployeeTableHeader;
