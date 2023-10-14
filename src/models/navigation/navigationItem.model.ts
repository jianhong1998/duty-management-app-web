import { ReactNode } from 'react';
import { UserAccountRoleType } from '../userAccount/userAccountRoleType.enum';

export default interface INavigationItem {
    tagName: string;
    icon: ReactNode;
    path: string;
    disabledFor?: UserAccountRoleType;
    subNavigationItems?: Omit<INavigationItem, 'subNavigationItem'>[];
}
