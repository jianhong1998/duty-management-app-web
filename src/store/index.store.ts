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
import { timeSlotApi } from './timeSlotSlice/timeSlot.api';
import { employeeFormSliceReducer } from './employeeFormSlice/employeeForm.slice';
import { userAccountApi } from './api/userAccount.api';

const appReducer = combineReducers({
    [SliceName.LOGIN]: loginSliceReducer,
    [SliceName.LOADING]: loadingSliceReducer,
    [SliceName.DASHBOARD]: dashboardSliceReducer,
    [SliceName.EMPLOYEE]: employeeSliceReducer,
    [SliceName.POPUP]: popupSliceReducer,
    [SliceName.EMPLOYEE_FORM]: employeeFormSliceReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [timeSlotApi.reducerPath]: timeSlotApi.reducer,
    [userAccountApi.reducerPath]: userAccountApi.reducer,
});

const store = configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(employeeApi.middleware)
            .concat(timeSlotApi.middleware)
            .concat(userAccountApi.middleware),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type DispatchFn = () => AppDispatch;
const useAppDispatch: DispatchFn = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
export { useAppDispatch, useAppSelector };
