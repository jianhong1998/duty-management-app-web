import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API } from '../../constants/backendApi';
import StandardResponse from '../../models/httpResponses/standardResponse';
import {
    IGetMonthlyDutyScheduleByMonthRequest,
    IMonthlyDutyScheduleResponse,
} from '../../models/monthlyDutySchedule/monthlyDutySchedule.model';

const userMonthlyScheduleApi = createApi({
    reducerPath: 'userMonthlyScheduleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API}/api/monthly-schedule`,
    }),
    endpoints: (builder) => ({
        userGetMonthlyDutyScheduleByMonth: builder.query<
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
    }),
});

export const { useUserGetMonthlyDutyScheduleByMonthQuery } =
    userMonthlyScheduleApi;
export default userMonthlyScheduleApi;
