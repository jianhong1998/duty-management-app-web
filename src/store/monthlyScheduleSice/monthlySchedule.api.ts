import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API } from '../../constants/backendApi';
import StandardResponse from '../../models/httpResponses/standardResponse';
import {
    IConfirmMonthlyDutyScheduleByMonthRequest,
    IDeleteMonthlyDutyScheduleByMonthRequest,
    IGetMonthlyDutyScheduleByMonthRequest,
    IMonthlyDutyScheduleResponse,
    IPostMonthlyDutyScheduleByMonthRequest,
} from '../../models/monthlyDutySchedule/monthlyDutySchedule.model';

const monthlyScheduleApi = createApi({
    reducerPath: 'monthlyScheduleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API}/api/admin/monthly-schedule`,
    }),
    endpoints: (builder) => ({
        getMonthlyDutySchedulesByMonth: builder.query<
            StandardResponse<IMonthlyDutyScheduleResponse>,
            IGetMonthlyDutyScheduleByMonthRequest
        >({
            query: ({ token, month, year }) => ({
                url: `/?month=${month}&year=${year}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
            }),
        }),
        deleteMonthlyDutySchedulesByMonth: builder.mutation<
            StandardResponse<undefined>,
            IDeleteMonthlyDutyScheduleByMonthRequest
        >({
            query: ({ token, month, year }) => ({
                url: `/?month=${month}&year=${year}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'DELETE',
            }),
        }),
        postMonthlyDutyScheduleByMonth: builder.mutation<
            StandardResponse<IMonthlyDutyScheduleResponse>,
            IPostMonthlyDutyScheduleByMonthRequest
        >({
            query: ({ token, month, year }) => ({
                url: `/`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: {
                    month,
                    year,
                },
            }),
        }),
        confirmMonthlyDutyScheduleByMonth: builder.mutation<
            StandardResponse<IMonthlyDutyScheduleResponse>,
            IConfirmMonthlyDutyScheduleByMonthRequest
        >({
            query: ({ token, month, year }) => ({
                url: `/confirm/?month=${month}&year=${year}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'PATCH',
            }),
        }),
    }),
});

export const {
    useGetMonthlyDutySchedulesByMonthQuery,
    usePostMonthlyDutyScheduleByMonthMutation,
    useConfirmMonthlyDutyScheduleByMonthMutation,
    useDeleteMonthlyDutySchedulesByMonthMutation,
} = monthlyScheduleApi;
export default monthlyScheduleApi;
