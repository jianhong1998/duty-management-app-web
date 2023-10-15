import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API } from '../../constants/backendApi';
import StandardResponse from '../../models/httpResponses/standardResponse';
import {
    IGetTimeSlotRequestConfig,
    IGetTimeSlotResponse,
} from '../../models/timeSlot/timeSlot.model';

export const adminTimeSlotApi = createApi({
    reducerPath: 'adminTimeSlotApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_API}/api/admin/time-slot`,
    }),
    endpoints: (builder) => ({
        getTimeSlot: builder.query<
            StandardResponse<IGetTimeSlotResponse>,
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

export const { useGetTimeSlotQuery } = adminTimeSlotApi;
