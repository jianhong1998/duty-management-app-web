import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API } from '../../constants/backendApi';
import StandardResponse from '../../models/httpResponses/standardResponse';
import {
    IGetTimeSlotRequestConfig,
    ResponseTimeSlot,
} from '../../models/timeSlot/timeSlot.model';

export const timeSlotApi = createApi({
    reducerPath: 'timeSlotApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API}/api/time-slot`,
    }),
    endpoints: (builder) => ({
        getTimeSlot: builder.query<
            StandardResponse<ResponseTimeSlot>,
            IGetTimeSlotRequestConfig
        >({
            query: ({ token, timeSlotId }) => ({
                url: `${timeSlotId}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const { useGetTimeSlotQuery } = timeSlotApi;
