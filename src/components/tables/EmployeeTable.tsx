import { FC, useState } from 'react';
import { IEmployee } from '../../models/employee/employee.model';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import EmployeeTableRow from './EmployeeTableRow';
import EmployeeAvailabilityInfoPopup from '../common/popup/employeeAvailabilityInfoPopup/EmployeeAvailabilityInfoPopup';

interface EmployeeTableProps {
    employees: IEmployee[];
}

const EMPTY_AVAILABILITY_IDS: IEmployee['weeklyAvailabilityTimeSlotIds'] = {
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
    sat: null,
    sun: null
};

const EmployeeTable: FC<EmployeeTableProps> = ({ employees }) => {
    const [isAvailabilityInfoPopupOpen, setIsAvailabilityInfoPopupOpen] =
        useState<boolean>(false);

    const [employeeName, setEmployeeName] = useState<string>('');

    const [availabilityIds, setAvailabilityIds] = useState<
        IEmployee['weeklyAvailabilityTimeSlotIds']
    >(EMPTY_AVAILABILITY_IDS);

    const openAvailabilityInfoPopup = (
        employeeName: string,
        availabilityIds: IEmployee['weeklyAvailabilityTimeSlotIds']
    ) => {
        setEmployeeName(employeeName);
        setAvailabilityIds(availabilityIds);
        setIsAvailabilityInfoPopupOpen(true);
    };

    const closeAvailabilityInfoPopup = () => {
        setIsAvailabilityInfoPopupOpen(false);
        setEmployeeName('');
        setAvailabilityIds(EMPTY_AVAILABILITY_IDS);
    };

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                            Employment Type
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                            Contact Number
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                            Active Status
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.length > 0 &&
                        employees.map((employee) => (
                            <EmployeeTableRow
                                employee={employee}
                                openAvailabilityInfoPopupFn={
                                    openAvailabilityInfoPopup
                                }
                                key={employee.id}
                            />
                        ))}
                </TableBody>
            </Table>
            <EmployeeAvailabilityInfoPopup
                isOpen={isAvailabilityInfoPopupOpen}
                employeeName={employeeName}
                availabilityIds={availabilityIds}
                closePopupFn={closeAvailabilityInfoPopup}
            />
        </>
    );
};

export default EmployeeTable;
