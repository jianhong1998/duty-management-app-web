import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API } from '../../constants/backendApi';
import { IEmployee } from '../../models/employee/employee.model';
import StandardResponse from '../../models/httpResponses/standardResponse';

interface IEmployeeGetAllRequestConfig {
    token: string;
}

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API}/api/employee`,
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
    }),
});

export const { useGetAllEmployeesQuery } = employeeApi;
