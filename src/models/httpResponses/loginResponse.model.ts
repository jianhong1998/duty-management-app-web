import StandardResponse from './standardResponse';

interface LoginSuccessResponse {
    isLoginSuccess: true;
    token: string;
    name: string;
}

interface LoginFailureResponse {
    isLoginSuccess: false;
    errorMessage: string;
}

export type ILoginResponse = StandardResponse<
    LoginSuccessResponse | LoginFailureResponse
>;
