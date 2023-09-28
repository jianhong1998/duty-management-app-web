// End Point:
// http://localhost:3001/api/auth/login

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginResponse } from '../../models/httpResponses/loginResponse.model';
import { BACKEND_API } from '../../constants/backendApi';
import { ILoginRequest } from '../../models/httpRequests/loginRequest.model';
import axios, { AxiosRequestConfig, isAxiosError } from 'axios';
import StandardResponse from '../../models/httpResponses/standardResponse';
import StandardErrorMessage from '../../models/error/errorMessage.enum';
import SliceName from '../sliceName';

export enum LoginThunkType {
    LOGIN = `${SliceName.LOGIN}/login`,
    VERIFY_TOKEN = `${SliceName.LOGIN}/verify-token`
}

export const loginFn = createAsyncThunk(
    LoginThunkType.LOGIN,
    async (loginRequest: ILoginRequest): Promise<ILoginResponse> => {
        try {
            const url = `${BACKEND_API}/api/auth/login`;

            const config: AxiosRequestConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const result = await axios.post<ILoginResponse>(
                url,
                loginRequest,
                config
            );

            return result.data;
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 400) {
                    throw new Error('Email or Password is incorrect.');
                }

                if (typeof error.response === 'undefined') {
                    throw new Error(
                        StandardErrorMessage.SERVER_CONNECTION_REFUSE
                    );
                }
            }

            throw error;
        }
    }
);

export const verifyToken = createAsyncThunk(
    LoginThunkType.VERIFY_TOKEN,
    async (): Promise<boolean> => {
        const token = localStorage.getItem('token');

        if (token === null) {
            return false;
        }

        const url = `${BACKEND_API}/api/auth/`;

        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `bearer ${token}`
            }
        };

        try {
            const { data: response } = await axios.get<
                StandardResponse<boolean>
            >(url, config);

            if (!response.isSuccess) {
                throw new Error('Response is not success');
            }

            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response && error.response.status === 401) {
                    return false;
                }

                if (!error.response) {
                    throw new Error(
                        StandardErrorMessage.SERVER_CONNECTION_REFUSE
                    );
                }
            }

            throw error;
        }
    }
);
