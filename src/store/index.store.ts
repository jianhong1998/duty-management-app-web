import { combineReducers, configureStore } from '@reduxjs/toolkit';
import SliceName from './sliceName';
import { loginSliceReducer } from './loginSlice/login.slice';
import { loadingSliceReducer } from './loadingSlice/loading.slice';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { dashboardSliceReducer } from './dashboardSlice/dashboard.slice';
import { employeeSliceReducer } from './employeeSlice/employee.slice';
import { employeeApi } from './employeeSlice/employee.api';
import { popupSliceReducer } from './popupSlice/popupSlice';
import { adminTimeSlotApi } from './api/timeSlot.admin.api';
import { employeeFormSliceReducer } from './employeeFormSlice/employeeForm.slice';
import { userAccountApi } from './api/userAccount.api';
import { employeeTimeSlotApi } from './api/employeeTimeSlot.api';
import { timeSlotApi } from './api/timeSlot.api';
import { timeSlotSliceReducer } from './timeSlotSlice/timeSlot.slice';
import { monthlyScheduleSliceReducer } from './monthlyScheduleSice/monthlySchedule.slice';
import monthlyScheduleApi from './monthlyScheduleSice/monthlySchedule.api';
import userMonthlyScheduleApi from './monthlyScheduleSice/userMonthlySchedule.api';
import passwordApi from './api/password.api';
import { authApi } from './api/auth.api';

const appReducer = combineReducers({
    [SliceName.LOGIN]: loginSliceReducer,
    [SliceName.LOADING]: loadingSliceReducer,
    [SliceName.DASHBOARD]: dashboardSliceReducer,
    [SliceName.EMPLOYEE]: employeeSliceReducer,
    [SliceName.POPUP]: popupSliceReducer,
    [SliceName.EMPLOYEE_FORM]: employeeFormSliceReducer,
    [SliceName.TIME_SLOT]: timeSlotSliceReducer,
    [SliceName.MONTHLY_SCHEDULE]: monthlyScheduleSliceReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [timeSlotApi.reducerPath]: timeSlotApi.reducer,
    [adminTimeSlotApi.reducerPath]: adminTimeSlotApi.reducer,
    [userAccountApi.reducerPath]: userAccountApi.reducer,
    [employeeTimeSlotApi.reducerPath]: employeeTimeSlotApi.reducer,
    [monthlyScheduleApi.reducerPath]: monthlyScheduleApi.reducer,
    [userMonthlyScheduleApi.reducerPath]: userMonthlyScheduleApi.reducer,
    [passwordApi.reducerPath]: passwordApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
});

const store = configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(employeeApi.middleware)
            .concat(timeSlotApi.middleware)
            .concat(adminTimeSlotApi.middleware)
            .concat(userAccountApi.middleware)
            .concat(employeeTimeSlotApi.middleware)
            .concat(monthlyScheduleApi.middleware)
            .concat(userMonthlyScheduleApi.middleware)
            .concat(passwordApi.middleware)
            .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type DispatchFn = () => AppDispatch;
const useAppDispatch: DispatchFn = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
export { useAppDispatch, useAppSelector };
