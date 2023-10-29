import { UserAccountRoleType } from '../userAccount/userAccountRoleType.enum';
import UserAccountStatus from '../userAccount/userAccountStatus.enum';
import StandardResponse from './standardResponse';

interface LoginSuccessResponse {
    isLoginSuccess: true;
    token: string;
    name: string;
    employeeId: number | null;
    accountType: UserAccountRoleType;
    accountStatus: UserAccountStatus;
}

interface LoginFailureResponse {
    isLoginSuccess: false;
    errorMessage: string;
}

export type ILoginResponse = StandardResponse<
    LoginSuccessResponse | LoginFailureResponse
>;
