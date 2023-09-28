import { ReactNode } from 'react';

export default interface INavigationItem {
    tagName: string;
    icon: ReactNode;
    path: string;
}
