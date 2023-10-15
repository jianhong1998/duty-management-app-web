import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { FC } from 'react';
import navigationCategories from '../../constants/navigationCatogory';
import NavigationItem from './navigationItem/NavigationItem';
import NestNavigationItem from './navigationItem/NestNavigationItem';
import { useAppSelector } from '../../store/index.store';

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

const DashboardNavigator: FC<DrawerProps> = (props) => {
    const { ...other } = props;

    const { accountType } = useAppSelector((state) => state.loginSlice);

    return (
        <Drawer
            variant='permanent'
            {...other}
        >
            <List disablePadding>
                <ListItem
                    sx={{
                        ...item,
                        ...itemCategory,
                        fontSize: 22,
                        color: '#fff',
                    }}
                    key={'title'}
                >
                    Duty Management App
                </ListItem>
                <Box
                    key={'dashboardNavigator-container'}
                    sx={{ bgcolor: '#101F33' }}
                >
                    {navigationCategories.map((navigationItem, index) => {
                        if (
                            typeof navigationItem.disabledFor !== 'undefined' &&
                            navigationItem.disabledFor === accountType
                        ) {
                            return null;
                        }

                        if (navigationItem.subNavigationItems) {
                            return (
                                <NestNavigationItem
                                    navigationItem={navigationItem}
                                    key={navigationItem.tagName}
                                />
                            );
                        }

                        return (
                            <ListItem
                                disablePadding
                                key={navigationItem.tagName}
                                sx={{ py: 1 }}
                            >
                                <NavigationItem
                                    item={navigationItem}
                                    key={index}
                                />
                            </ListItem>
                        );
                    })}
                </Box>
            </List>
        </Drawer>
    );
};

export default DashboardNavigator;
