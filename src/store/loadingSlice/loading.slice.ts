import { createSlice } from '@reduxjs/toolkit';
import SliceName from '../sliceName';

interface LoadingState {
    isLoading: boolean;
}

const initialState: LoadingState = {
    isLoading: false
};

const openLoading = (state: LoadingState) => {
    state.isLoading = true;
};

const closeLoading = (state: LoadingState) => {
    state.isLoading = false;
};

const loadingSlice = createSlice({
    name: SliceName.LOADING,
    initialState,
    reducers: { openLoading, closeLoading }
});

const loadingSliceActions = loadingSlice.actions;
const loadingSliceReducer = loadingSlice.reducer;

export default loadingSlice;
export { loadingSliceActions, loadingSliceReducer };
