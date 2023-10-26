import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API } from '../../constants/backendApi';
import StandardResponse from '../../models/httpResponses/standardResponse';
import {
    IGetMonthlyDutyScheduleByIdRequest,
    IMonthlyDutyScheduleResponse,
} from '../../models/monthlyDutySchedule/monthlyDutySchedule.model';

const monthlyScheduleApi = createApi({
    reducerPath: 'monthlyScheduleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API}/api/admin/monthly-schedule`,
    }),
    endpoints: (builder) => ({
        getMonthlyDutySchedulesByMonth: builder.query<
            StandardResponse<IMonthlyDutyScheduleResponse>,
            IGetMonthlyDutyScheduleByIdRequest
        >({
            query: ({ token, month, year }) => ({
                url: `/?month=${month}&year=${year}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetMonthlyDutySchedulesByMonthQuery } = monthlyScheduleApi;
export default monthlyScheduleApi;
