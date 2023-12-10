import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API } from '../../constants/backendApi';
import { IEmployee } from '../../models/employee/employee.model';
import StandardResponse from '../../models/httpResponses/standardResponse';
import IPagination from '../../models/pagination/pagination.model';
import { RootState } from '../index.store';

interface IEmployeeGetAllRequestConfig {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortOrder?: string;
}

interface IEmployeeDeactivateRequestConfig {
    employeeId: number;
}

interface IEmployeeReactivateRequestConfig
    extends IEmployeeDeactivateRequestConfig {}

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API}/api/admin/employee`,
        prepareHeaders: (headers, { getState }) => {
            const { token } = (getState() as RootState).loginSlice;

            headers.set('Authorization', `Bearer ${token}`);
        },
    }),
    endpoints: (builder) => ({
        getAllEmployees: builder.query<
            StandardResponse<{
                employees: IEmployee[];
                paginationInfo: IPagination;
            }>,
            IEmployeeGetAllRequestConfig
        >({
            query: ({ pageNumber, pageSize, sortBy, sortOrder }) => {
                let url = `/?pageNumber=${pageNumber}&pageSize=${pageSize}`;

                if (sortBy && sortOrder) {
                    url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
                }

                return {
                    url,
                    method: 'GET',
                };
            },
        }),
        deactivateEmployee: builder.mutation<
            StandardResponse<IEmployee[]>,
            IEmployeeDeactivateRequestConfig
        >({
            query: ({ employeeId }) => ({
                url: `/${employeeId}`,
                method: 'DELETE',
            }),
        }),
        reactivateEmployee: builder.mutation<
            StandardResponse<IEmployee>,
            IEmployeeReactivateRequestConfig
        >({
            query: ({ employeeId }) => ({
                url: `/reactivate/${employeeId}`,
                method: 'PATCH',
            }),
        }),
    }),
});

export const {
    useGetAllEmployeesQuery,
    useDeactivateEmployeeMutation,
    useReactivateEmployeeMutation,
} = employeeApi;
