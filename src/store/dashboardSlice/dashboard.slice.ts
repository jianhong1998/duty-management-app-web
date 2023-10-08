import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SliceName from '../sliceName';

interface DashboardState {
    pageTitle: string;
}

const initialState: DashboardState = {
    pageTitle: '',
};

const setPageTitle = (state: DashboardState, action: PayloadAction<string>) => {
    state.pageTitle = action.payload;
};

const dashboardSlice = createSlice({
    name: SliceName.DASHBOARD,
    initialState,
    reducers: { setPageTitle },
});

export const dashboardSliceActions = dashboardSlice.actions;
export const dashboardSliceReducer = dashboardSlice.reducer;
export default dashboardSlice;
