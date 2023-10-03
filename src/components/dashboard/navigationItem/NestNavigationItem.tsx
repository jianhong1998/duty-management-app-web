import { ListItem, Collapse, List } from '@mui/material';
import { FC, useState } from 'react';
import INavigationItem from '../../../models/navigation/navigationItem.model';
import NavigationItem from './NavigationItem';

interface NestNavigationItemProps {
    navigationItem: INavigationItem;
}

const NestNavigationItem: FC<NestNavigationItemProps> = ({
    navigationItem
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClickHandler = () => {
        setIsOpen(true);
    };

    return (
        <>
            <ListItem
                onClick={onClickHandler}
                sx={{ py: 1 }}
                disablePadding
            >
                <NavigationItem item={navigationItem} />
            </ListItem>
            <Collapse
                in={isOpen}
                timeout={'auto'}
                unmountOnExit
            >
                <List
                    component={'div'}
                    disablePadding
                >
                    {navigationItem.subNavigationItems &&
                        navigationItem.subNavigationItems.map(
                            (subNavigationItem) => (
                                <>
                                    <ListItem
                                        disablePadding
                                        sx={{ pl: 2 }}
                                    >
                                        <NavigationItem
                                            item={subNavigationItem}
                                        />
                                    </ListItem>
                                </>
                            )
                        )}
                </List>
            </Collapse>
        </>
    );
};

export default NestNavigationItem;
