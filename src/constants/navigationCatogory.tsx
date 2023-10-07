import HomeIcon from '@mui/icons-material/Home';
import INavigationItem from '../models/navigation/navigationItem.model';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddIcon from '@mui/icons-material/Add';

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
        subNavigationItems: [
            {
                tagName: 'Add Employee',
                icon: <AddIcon />,
                path: '/add-employee',
            },
        ],
    },
];

export default navigationCategories;
