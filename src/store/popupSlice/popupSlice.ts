import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SliceName from '../sliceName';

interface PopupState {
    isOpen: boolean;
    content: string;
    title?: string;
}

const initialState: PopupState = {
    isOpen: false,
    content: '',
    title: undefined
};

const openPopup = (
    state: PopupState,
    action: PayloadAction<{ content: string; title?: string }>
) => {
    state.isOpen = true;
    state.content = action.payload.content;
    state.title = action.payload.title;
};

const closePopup = (state: PopupState) => {
    state.content = '';
    state.title = undefined;
    state.isOpen = false;
};

const popupSlice = createSlice({
    name: SliceName.POPUP,
    initialState,
    reducers: { openPopup, closePopup }
});

export const popupSliceActions = popupSlice.actions;
export const popupSliceReducer = popupSlice.reducer;

export default popupSlice;
