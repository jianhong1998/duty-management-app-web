import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BACKEND_API } from '../../constants/backendApi';
import StandardResponse from '../../models/httpResponses/standardResponse';
import {
    IUserAccountCreationFormData,
    IUserAccountUpdateFormData,
} from '../../models/userAccount/userAccount.model';
import { IUserAccountUpdateResponse } from '../../models/httpResponses/userAccountResponse.model';

export const userAccountApi = createApi({
    reducerPath: 'userAccountApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API}/api/user-account`,
    }),
    endpoints: (builder) => ({
        createEmployeeAndUserAccount: builder.mutation<
            StandardResponse<string>,
            IUserAccountCreationFormData & { token: string }
        >({
            query: ({
                token,
                accountType,
                contactNumber,
                emailAddress,
                employmentType,
                name,
                role,
            }) => ({
                url: '',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    name,
                    contactNumber,
                    emailAddress,
                    accountType,
                    employmentType,
                    role,
                },
            }),
        }),
        updateEmployeeAndUserAccount: builder.mutation<
            StandardResponse<IUserAccountUpdateResponse>,
            IUserAccountUpdateFormData & { token: string }
        >({
            query: ({
                accountType,
                contactNumber,
                emailAddress,
                employmentType,
                name,
                role,
                token,
                employeeId,
            }) => ({
                url: `/employee/${employeeId}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    accountType,
                    contactNumber,
                    emailAddress,
                    employmentType,
                    name,
                    role,
                },
            }),
        }),
        getEmployeeAndUserAccount: builder.query<
            StandardResponse<IUserAccountCreationFormData>,
            { token: string; employeeId: number }
        >({
            query: ({ token, employeeId }) => ({
                url: `/employee/${employeeId}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const {
    useCreateEmployeeAndUserAccountMutation,
    useUpdateEmployeeAndUserAccountMutation,
    useGetEmployeeAndUserAccountQuery,
} = userAccountApi;
