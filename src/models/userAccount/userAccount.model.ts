import { EmployeeRole, EmploymentType } from '../employee/employee.model';
import { UserAccountRoleType } from './userAccountRoleType.enum';

export interface IUserAccountCreationFormData {
    name: string;
    employmentType: EmploymentType;
    role: EmployeeRole;
    contactNumber: number;
    emailAddress: string;
    accountType: UserAccountRoleType;
}

export interface IUserAccountUpdateFormData
    extends IUserAccountCreationFormData {
    employeeId: number;
}
