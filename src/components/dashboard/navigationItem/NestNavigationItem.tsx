import { ListItem, Collapse, List } from '@mui/material';
import { FC, useState, Fragment } from 'react';
import INavigationItem from '../../../models/navigation/navigationItem.model';
import NavigationItem from './NavigationItem';
import { useAppSelector } from '../../../store/index.store';

interface NestNavigationItemProps {
    navigationItem: INavigationItem;
}

const NestNavigationItem: FC<NestNavigationItemProps> = ({
    navigationItem,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { accountType } = useAppSelector((state) => state.loginSlice);

    const onClickHandler = () => {
        setIsOpen(true);
    };

    return (
        <Fragment key={navigationItem.tagName}>
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
                            (subNavigationItem) => {
                                if (
                                    subNavigationItem.disabledFor &&
                                    subNavigationItem.disabledFor ===
                                        accountType
                                ) {
                                    return null;
                                }

                                return (
                                    <ListItem
                                        disablePadding
                                        sx={{ pl: 2 }}
                                        key={subNavigationItem.tagName}
                                    >
                                        <NavigationItem
                                            item={subNavigationItem}
                                        />
                                    </ListItem>
                                );
                            },
                        )}
                </List>
            </Collapse>
        </Fragment>
    );
};

export default NestNavigationItem;
