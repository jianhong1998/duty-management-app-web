import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API } from '../../constants/backendApi';
import StandardResponse from '../../models/httpResponses/standardResponse';
import { IGetTimeSlotResponse } from '../../models/timeSlot/timeSlot.model';

export const timeSlotApi = createApi({
    reducerPath: 'timeSlotApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API}/api/time-slot`,
    }),
    endpoints: (builder) => ({
        getAllAvailableTimeSlots: builder.query<
            StandardResponse<IGetTimeSlotResponse[]>,
            { token: string }
        >({
            query: ({ token }) => ({
                url: '/',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const { useGetAllAvailableTimeSlotsQuery } = timeSlotApi;
