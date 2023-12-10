import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API } from '../../constants/backendApi';
import {
    IEmployeeDefaultWeeklyTimeSlots,
    IGetEmployeeDefaultWeeklyTimeSlotsRequestConfig,
    IPutEmployeeDefaultWeeklyTimeSlotsRequestConfig,
} from '../../models/timeSlot/employeeTimeSlot.model';
import StandardResponse from '../../models/httpResponses/standardResponse';
import { RootState } from '../index.store';

export const employeeTimeSlotApi = createApi({
    reducerPath: 'employeeTimeSlotApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API}/api/employee-time-slot`,
        prepareHeaders: (headers, { getState }) => {
            const { token } = (getState() as RootState).loginSlice;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getEmployeeDefaultWeeklyTimeSlots: builder.query<
            StandardResponse<IEmployeeDefaultWeeklyTimeSlots>,
            IGetEmployeeDefaultWeeklyTimeSlotsRequestConfig
        >({
            query: ({ employeeId }) => ({
                url: `/${employeeId}`,
                method: 'GET',
            }),
        }),
        putEmployeeDefaultWeeklyTimeSlots: builder.mutation<
            StandardResponse<IEmployeeDefaultWeeklyTimeSlots>,
            IPutEmployeeDefaultWeeklyTimeSlotsRequestConfig
        >({
            query: ({ employeeId, weeklyTimeSlotIds }) => ({
                url: `/${employeeId}`,
                body: weeklyTimeSlotIds,
                method: 'PUT',
            }),
        }),
    }),
});

export const {
    useGetEmployeeDefaultWeeklyTimeSlotsQuery,
    usePutEmployeeDefaultWeeklyTimeSlotsMutation,
} = employeeTimeSlotApi;
