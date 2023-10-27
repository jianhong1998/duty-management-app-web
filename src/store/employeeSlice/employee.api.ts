import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API } from '../../constants/backendApi';
import { IEmployee } from '../../models/employee/employee.model';
import StandardResponse from '../../models/httpResponses/standardResponse';

interface IEmployeeGetAllRequestConfig {
    token: string;
}

interface IEmployeeDeactivateRequestConfig {
    token: string;
    employeeId: number;
}

interface IEmployeeReactivateRequestConfig
    extends IEmployeeDeactivateRequestConfig {}

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API}/api/admin/employee`,
    }),
    endpoints: (builder) => ({
        getAllEmployees: builder.query<
            StandardResponse<IEmployee[]>,
            IEmployeeGetAllRequestConfig
        >({
            query: ({ token }) => {
                return {
                    url: '',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
        }),
        deactivateEmployee: builder.mutation<
            StandardResponse<IEmployee[]>,
            IEmployeeDeactivateRequestConfig
        >({
            query: ({ employeeId, token }) => ({
                url: `/${employeeId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        reactivateEmployee: builder.mutation<
            StandardResponse<IEmployee>,
            IEmployeeReactivateRequestConfig
        >({
            query: ({ token, employeeId }) => ({
                url: `/reactivate/${employeeId}`,
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const {
    useGetAllEmployeesQuery,
    useDeactivateEmployeeMutation,
    useReactivateEmployeeMutation,
} = employeeApi;
