import { createSlice } from '@reduxjs/toolkit';
import SliceName from '../sliceName';

interface LoadingState {
    isLoading: boolean;
}

const initialState: LoadingState = {
    isLoading: false
};

const startLoading = (state: LoadingState) => {
    state.isLoading = true;
};

const endLoading = (state: LoadingState) => {
    state.isLoading = false;
};

const loadingSlice = createSlice({
    name: SliceName.LOADING,
    initialState,
    reducers: { startLoading, endLoading }
});

const loadingSliceActions = loadingSlice.actions;
const loadingSliceReducer = loadingSlice.reducer;

export default loadingSlice;
export { loadingSliceActions, loadingSliceReducer };
