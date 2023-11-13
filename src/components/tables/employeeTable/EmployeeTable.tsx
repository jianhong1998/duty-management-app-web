import { FC, useState } from 'react';
import { IEmployee } from '../../../models/employee/employee.model';
import EmployeeAvailabilityInfoPopup from '../../common/popup/employeeAvailabilityInfoPopup/EmployeeAvailabilityInfoPopup';
import {
    DataGrid,
    GridColDef,
    GridColumnHeaderParams,
    GridPaginationModel,
    GridSortModel,
    GridValueFormatterParams,
} from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../store/index.store';
import { employeeSliceActions } from '../../../store/employeeSlice/employee.slice';
import EmployeeTableHeader from './EmployeeTableHeader';
import ContactNumberUtil from '../../../utils/contactNumberUtil';
import ActiveBadge from '../../common/badge/ActiveBadge';
import { Box } from '@mui/material';
import ViewAvailabilityButton from './buttons/ViewAvailabilityButton';
import EditEmployeeButton from './buttons/EditEmployeeButton';
import DeactivateEmployeeButton from './buttons/DeactivateEmployeeButton';
import ReactivateEmployeeButton from './buttons/ReactivateEmployeeButton';

interface EmployeeTableProps {
    employees: IEmployee[];
}

const EmployeeTable: FC<EmployeeTableProps> = ({ employees }) => {
    const [isAvailabilityInfoPopupOpen, setIsAvailabilityInfoPopupOpen] =
        useState<boolean>(false);

    const [employeeName, setEmployeeName] = useState<string>('');
    const [employeeId, setEmployeeId] = useState<number>(0);

    const { paginationModel, totalRows, sortModel } = useAppSelector(
        (state) => state.employeeSlice.employeeTable,
    );

    const dispatch = useAppDispatch();

    const { setEmployeeTablePaginationModel, setEmployeeTableSortModel } =
        employeeSliceActions;

    let columnDefinations: GridColDef<IEmployee>[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 80,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
        },
        {
            field: 'employmentType',
            headerName: 'Type',
            width: 100,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 160,
        },
        {
            field: 'contactNumber',
            headerName: 'Contact Number',
            width: 180,
            valueFormatter: (params: GridValueFormatterParams<number>) =>
                ContactNumberUtil.convertContactNumberToFormettedString(
                    params.value,
                ),
        },
        {
            field: 'isActive',
            headerName: 'Status',
            type: 'boolean',
            width: 120,
            headerAlign: 'left',
            renderCell: (params) => (
                <Box
                    width='100%'
                    justifyContent='flex-start'
                    display='flex'
                >
                    <Box width={'80%'}>
                        <ActiveBadge isActive={params.value} />
                    </Box>
                </Box>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: 'left',
            type: 'actions',
            width: 220,
            align: 'left',
            getActions: (params) => [
                <ViewAvailabilityButton
                    openAvailabilityInfoPopupFn={openAvailabilityInfoPopup(
                        params.row.name,
                        params.row.id,
                    )}
                />,
                <EditEmployeeButton employeeId={params.row.id} />,
                params.row.isActive ? (
                    <DeactivateEmployeeButton
                        employeeId={params.row.id}
                        employeeName={params.row.name}
                    />
                ) : (
                    <ReactivateEmployeeButton
                        employeeId={params.row.id}
                        employeeName={params.row.name}
                    />
                ),
            ],
        },
    ];

    columnDefinations = columnDefinations.map((colDef) => ({
        ...colDef,
        renderHeader: (param: GridColumnHeaderParams<IEmployee>) => (
            <EmployeeTableHeader headerName={param.colDef.headerName || ''} />
        ),
    }));

    const onPaginationModelChange = (model: GridPaginationModel) => {
        dispatch(setEmployeeTablePaginationModel(model));
    };

    const onSortModelChange = (model: GridSortModel) => {
        dispatch(setEmployeeTableSortModel(model));
    };

    const openAvailabilityInfoPopup = (
        employeeName: string,
        employeeId: number,
    ) => {
        return () => {
            setEmployeeName(employeeName);
            setEmployeeId(employeeId);
            setIsAvailabilityInfoPopupOpen(true);
        };
    };

    const closeAvailabilityInfoPopup = () => {
        setIsAvailabilityInfoPopupOpen(false);
        setEmployeeName('');
    };

    return (
        <>
            <DataGrid
                columns={columnDefinations}
                rows={employees}
                disableColumnMenu
                disableColumnSelector
                rowSelection={false}
                rowCount={totalRows}
                paginationMode='server'
                pageSizeOptions={[5, 10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={onPaginationModelChange}
                sortingMode='server'
                sortModel={sortModel}
                onSortModelChange={onSortModelChange}
                autoHeight
            />
            <EmployeeAvailabilityInfoPopup
                isOpen={isAvailabilityInfoPopupOpen}
                employeeName={employeeName}
                employeeId={employeeId}
                closePopupFn={closeAvailabilityInfoPopup}
            />
        </>
    );
};

export default EmployeeTable;
