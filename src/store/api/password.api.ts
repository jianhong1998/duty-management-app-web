import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import StandardResponse from '../../models/httpResponses/standardResponse';
import { BACKEND_API } from '../../constants/backendApi';
import UserAccountStatus from '../../models/userAccount/userAccountStatus.enum';

interface IResetPasswordResponseData {
    userId: number;
    accountStatus: UserAccountStatus;
    message: string;
}

interface IResetPasswordRequestConfig {
    token: string;
    oldPassword: string;
    newPassword: string;
}

const passwordApi = createApi({
    reducerPath: 'passwordApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API}/api/auth`,
    }),
    endpoints: (builder) => ({
        forgetUserAccountPassword: builder.mutation<
            StandardResponse<{ message: string }>,
            { email: string }
        >({
            query: ({ email }) => ({
                url: '/forget-password',
                method: 'POST',
                body: {
                    email,
                },
            }),
        }),
        resetUserAccountPassword: builder.mutation<
            StandardResponse<IResetPasswordResponseData>,
            IResetPasswordRequestConfig
        >({
            query: ({ token, newPassword, oldPassword }) => ({
                url: 'reset-password',
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    oldPassword,
                    newPassword,
                },
            }),
        }),
    }),
});

export const {
    useForgetUserAccountPasswordMutation,
    useResetUserAccountPasswordMutation,
} = passwordApi;
export default passwordApi;
