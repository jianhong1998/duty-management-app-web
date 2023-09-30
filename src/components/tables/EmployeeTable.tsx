import { FC } from 'react';
import { IEmployee } from '../../models/employee/employee.model';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import EmployeeTableRow from './EmployeeTableRow';

interface EmployeeTableProps {
    employees: IEmployee[];
}

const EmployeeTable: FC<EmployeeTableProps> = ({ employees }) => {
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Employment Type</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Contact Number</TableCell>
                        <TableCell>Active Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.length > 0 &&
                        employees.map((employee) => (
                            <EmployeeTableRow
                                employee={employee}
                                key={employee.id}
                            />
                        ))}
                </TableBody>
            </Table>
        </>
    );
};

export default EmployeeTable;
