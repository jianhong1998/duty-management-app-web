import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SliceName from '../sliceName';
import { UserAccountRoleType } from '../../models/userAccount/userAccountRoleType.enum';
import UserAccountStatus from '../../models/userAccount/userAccountStatus.enum';
import { authApi } from '../api/auth.api';

interface LoginState {
    token: string | null;
    username: string | null;
    accountType: UserAccountRoleType | null;
    employeeId: number | null;
    accountStatus: UserAccountStatus | null;
}

const initialState: LoginState = {
    token: null,
    username: null,
    accountType: null,
    employeeId: null,
    accountStatus: null,
};

const setTokenAndUsername = (
    state: LoginState,
    action: PayloadAction<{
        token: string | null;
        username: string | null;
        accountStatus: UserAccountStatus | null;
    }>,
) => {
    state.token = action.payload.token;
    state.username = action.payload.username;
    state.accountStatus = action.payload.accountStatus;
};

const setAccountStatus = (
    state: LoginState,
    action: PayloadAction<UserAccountStatus>,
) => {
    state.accountStatus = action.payload;
};

const clear = (state: LoginState) => {
    state.token = null;
    state.accountStatus = null;
    state.accountType = null;
    state.employeeId = null;
    state.username = null;
};

const loginSlice = createSlice({
    name: SliceName.LOGIN,
    initialState,
    reducers: { setTokenAndUsername, setAccountStatus, clear },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.verifyToken.matchFulfilled,
                (state, action) => {
                    if (action.payload) {
                        state.token = localStorage.getItem('token');
                        state.username = localStorage.getItem('username');
                        state.accountType =
                            (localStorage.getItem(
                                'accountType',
                            ) as UserAccountRoleType) ||
                            UserAccountRoleType.USER;

                        state.accountStatus =
                            (localStorage.getItem(
                                'accountStatus',
                            ) as UserAccountStatus) || null;

                        const employeeIdInString =
                            localStorage.getItem('employeeId');

                        state.employeeId =
                            employeeIdInString === null
                                ? null
                                : Number.parseInt(employeeIdInString);
                    }
                },
            )
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    if (
                        action.payload.isSuccess &&
                        action.payload.data.isLoginSuccess
                    ) {
                        localStorage.setItem(
                            'token',
                            action.payload.data.token,
                        );
                        localStorage.setItem(
                            'username',
                            action.payload.data.name,
                        );
                        localStorage.setItem(
                            'employeeId',
                            (action.payload.data.employeeId || -1).toString(),
                        );
                        localStorage.setItem(
                            'accountType',
                            action.payload.data.accountType,
                        );
                        localStorage.setItem(
                            'accountStatus',
                            action.payload.data.accountStatus,
                        );

                        state.username = action.payload.data.name;
                        state.token = action.payload.data.token;
                        state.accountType = action.payload.data.accountType;
                        state.employeeId = action.payload.data.employeeId;
                        state.accountStatus = action.payload.data.accountStatus;
                    }
                },
            );
    },
});

export const loginSliceActions = loginSlice.actions;
export const loginSliceReducer = loginSlice.reducer;

export default loginSlice;
// export { loginSliceActions, loginSliceReducer, LoginThunkType };
