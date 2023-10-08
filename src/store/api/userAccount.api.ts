import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BACKEND_API } from '../../constants/backendApi';
import StandardResponse from '../../models/httpResponses/standardResponse';
import { IUserAccountCreationFormData } from '../../models/userAccount/userAccount.model';

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
    }),
});

export const { useCreateEmployeeAndUserAccountMutation } = userAccountApi;
