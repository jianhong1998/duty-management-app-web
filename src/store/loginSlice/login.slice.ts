import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SliceName from '../sliceName';
import { loginFn, verifyToken } from './login.thunk';

enum LoginThunkType {
    LOGIN = `${SliceName.LOGIN}/login`,
    VERIFY_TOKEN = `${SliceName.LOGIN}/verify-token`
}

interface LoginState {
    token: string | null;
    username: string | null;
}

const initialState: LoginState = {
    token: null,
    username: null
};

const setTokenAndUsername = (
    state: LoginState,
    action: PayloadAction<{ token: string | null; username: string | null }>
) => {
    state.token = action.payload.token;
    state.username = action.payload.username;
};

const loginSlice = createSlice({
    name: SliceName.LOGIN,
    initialState,
    reducers: { setTokenAndUsername },
    extraReducers: (builder) => {
        builder.addCase(loginFn.fulfilled, (state, action) => {
            if (
                action.payload.isSuccess &&
                action.payload.data.isLoginSuccess
            ) {
                localStorage.setItem('token', action.payload.data.token);
                localStorage.setItem('username', action.payload.data.name);

                state.username = action.payload.data.name;
                state.token = action.payload.data.token;
            }
        });

        builder.addCase(verifyToken.fulfilled, (state, action) => {
            if (action.payload) {
                state.token = localStorage.getItem('token');
                state.username = localStorage.getItem('username');
            }
        });
    }
});

const loginSliceActions = loginSlice.actions;
const loginSliceReducer = loginSlice.reducer;

export default loginSlice;
export { loginSliceActions, loginSliceReducer, LoginThunkType };
