import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import StandardResponse from '../../models/httpResponses/standardResponse';
import { BACKEND_API } from '../../constants/backendApi';

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
    }),
});

export const { useForgetUserAccountPasswordMutation } = passwordApi;
export default passwordApi;
