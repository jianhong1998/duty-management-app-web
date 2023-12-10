import { ILoginResponse } from '../../models/httpResponses/loginResponse.model';
import { ILoginRequest } from '../../models/httpRequests/loginRequest.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BACKEND_API } from '../../constants/backendApi';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API}/api/auth`,
    }),
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (loginCredential) => ({
                url: '/login',
                method: 'POST',
                body: loginCredential,
            }),
        }),
        verifyToken: builder.query<boolean, { token: string }>({
            query: ({ token }) => ({
                url: '/',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const { useLoginMutation, useLazyVerifyTokenQuery } = authApi;
