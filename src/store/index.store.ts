import { configureStore } from '@reduxjs/toolkit';
import SliceName from './sliceName';
import { loginSliceReducer } from './loginSlice/login.slice';
import { loadingSliceReducer } from './loadingSlice/loading.slice';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { dashboardSliceReducer } from './dashboardSlice/dashboard.slice';

const store = configureStore({
    reducer: {
        [SliceName.LOGIN]: loginSliceReducer,
        [SliceName.LOADING]: loadingSliceReducer,
        [SliceName.DASHBOARD]: dashboardSliceReducer
    }
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type DispatchFn = () => AppDispatch;
const useAppDispatch: DispatchFn = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
export { useAppDispatch, useAppSelector };
