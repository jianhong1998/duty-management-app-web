import HomeIcon from '@mui/icons-material/Home';
import INavigationItem from '../models/navigation/navigationItem.model';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const navigationCategories: INavigationItem[] = [
    {
        tagName: 'Home',
        icon: <HomeIcon />,
        path: '/'
    },
    {
        tagName: 'Employee',
        icon: <PeopleAltIcon />,
        path: '/employee'
    }
];

export default navigationCategories;
