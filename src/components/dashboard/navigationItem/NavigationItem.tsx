import { FC, useEffect, useState } from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import INavigationItem from '../../../models/navigation/navigationItem.model';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationItemProps {
    item: INavigationItem;
}

const NavigationItem: FC<NavigationItemProps> = ({ item }) => {
    const { icon, tagName, path } = item;

    const [isSelected, setIsSelected] = useState<boolean>(
        window.location.pathname === path
    );

    const windowLocation = useLocation();
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(path);
    };

    useEffect(() => {
        setIsSelected(windowLocation.pathname === path);
    }, [windowLocation.pathname, path]);

    return (
        <ListItemButton
            selected={isSelected}
            sx={{
                py: '2px',
                px: 3,
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover, &:focus': {
                    bgcolor: 'rgba(255, 255, 255, 0.08)'
                }
            }}
            onClick={onClickHandler}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{tagName}</ListItemText>
        </ListItemButton>
    );
};

export default NavigationItem;
