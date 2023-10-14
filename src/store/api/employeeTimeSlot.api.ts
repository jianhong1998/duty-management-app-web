import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API } from '../../constants/backendApi';
import {
    IEmployeeDefaultWeeklyTimeSlots,
    IGetEmployeeDefaultWeeklyTimeSlotsRequestConfig,
} from '../../models/timeSlot/employeeTimeSlot.model';
import StandardResponse from '../../models/httpResponses/standardResponse';

export const employeeTimeSlotApi = createApi({
    reducerPath: 'employeeTimeSlotApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API}/api/employee-time-slot`,
    }),
    endpoints: (builder) => ({
        getEmployeeDefaultWeeklyTimeSlots: builder.query<
            StandardResponse<IEmployeeDefaultWeeklyTimeSlots>,
            IGetEmployeeDefaultWeeklyTimeSlotsRequestConfig
        >({
            query: ({ token, employeeId }) => ({
                url: `/${employeeId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetEmployeeDefaultWeeklyTimeSlotsQuery } =
    employeeTimeSlotApi;
