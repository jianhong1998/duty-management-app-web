import HomeIcon from '@mui/icons-material/Home';
import INavigationItem from '../models/navigation/navigationItem.model';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UserAccountRoleType } from '../models/userAccount/userAccountRoleType.enum';

const navigationCategories: INavigationItem[] = [
    {
        tagName: 'Home',
        icon: <HomeIcon />,
        path: '/',
    },
    {
        tagName: 'Employee',
        icon: <PeopleAltIcon />,
        path: '/employee',
        disabledFor: UserAccountRoleType.USER,
        subNavigationItems: [
            {
                tagName: 'Add Employee',
                icon: <AddIcon />,
                path: '/add-employee',
                disabledFor: UserAccountRoleType.USER,
            },
        ],
    },
    {
        tagName: 'Profile',
        icon: <AccountCircleIcon />,
        path: '/edit-profile',
    },
];

export default navigationCategories;
