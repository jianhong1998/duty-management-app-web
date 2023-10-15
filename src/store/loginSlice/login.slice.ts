import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SliceName from '../sliceName';
import { loginFn, verifyToken } from './login.thunk';
import { UserAccountRoleType } from '../../models/userAccount/userAccountRoleType.enum';

interface LoginState {
    token: string | null;
    username: string | null;
    accountType: UserAccountRoleType | null;
    employeeId: number | null;
}

const initialState: LoginState = {
    token: null,
    username: null,
    accountType: null,
    employeeId: null,
};

const setTokenAndUsername = (
    state: LoginState,
    action: PayloadAction<{ token: string | null; username: string | null }>,
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
                localStorage.setItem(
                    'employeeId',
                    (action.payload.data.employeeId || -1).toString(),
                );
                localStorage.setItem(
                    'accountType',
                    action.payload.data.accountType,
                );

                state.username = action.payload.data.name;
                state.token = action.payload.data.token;
                state.accountType = action.payload.data.accountType;
                state.employeeId = action.payload.data.employeeId;
            }
        });

        builder.addCase(verifyToken.fulfilled, (state, action) => {
            if (action.payload) {
                state.token = localStorage.getItem('token');
                state.username = localStorage.getItem('username');
                state.accountType =
                    (localStorage.getItem(
                        'accountType',
                    ) as UserAccountRoleType) || UserAccountRoleType.USER;

                const employeeIdInString = localStorage.getItem('employeeId');

                state.employeeId =
                    employeeIdInString === null
                        ? null
                        : Number.parseInt(employeeIdInString);
            }
        });
    },
});

export const loginSliceActions = loginSlice.actions;
export const loginSliceReducer = loginSlice.reducer;

export default loginSlice;
// export { loginSliceActions, loginSliceReducer, LoginThunkType };
