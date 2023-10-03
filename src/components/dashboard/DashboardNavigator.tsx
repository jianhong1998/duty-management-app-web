import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { FC } from 'react';
import navigationCategories from '../../constants/navigationCatogory';
import NavigationItem from './navigationItem/NavigationItem';
import NestNavigationItem from './navigationItem/NestNavigationItem';

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)'
    }
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3
};

const DashboardNavigator: FC<DrawerProps> = (props) => {
    const { ...other } = props;

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
                        color: '#fff'
                    }}
                >
                    Duty Management App
                </ListItem>
                <Box sx={{ bgcolor: '#101F33' }}>
                    {navigationCategories.map((navigationItem) => {
                        if (navigationItem.subNavigationItems) {
                            return (
                                <>
                                    <NestNavigationItem
                                        key={navigationItem.tagName}
                                        navigationItem={navigationItem}
                                    />
                                </>
                            );
                        }

                        return (
                            <ListItem
                                disablePadding
                                key={navigationItem.tagName}
                                sx={{ py: 1 }}
                            >
                                <NavigationItem item={navigationItem} />
                            </ListItem>
                        );
                    })}
                </Box>
            </List>
        </Drawer>
    );
};

export default DashboardNavigator;
