import {FC, ReactElement} from 'react';
import {List} from "@mui/material";
import {useLocation} from "react-router-dom";
import {menuItems} from "@/components/layouts/DefaultLayout/DefaultLayoutSidebar/DefaultLayoutSidebar.contstant";
import {
    StyledListIcon,
    StyledListItem, StyledListLink
} from "@/components/layouts/DefaultLayout/DefaultLayoutSidebar/DefaultLayoutSidebar.style";

const DefaultLayoutSidebar: FC = (): ReactElement => {
    const location = useLocation();

    const getNavLinkClass = (path: string): string => location.pathname === path
        ? "page-active"
        : "page-inactive";

    return (
        <List
            sx={{
                backgroundColor: '#fff',
                marginRight: '20px',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            {
                menuItems.map((item) => (
                    <StyledListItem key={item.id} className={getNavLinkClass(item.url)}>
                        <StyledListLink to={item.url}>
                            <StyledListIcon name={item.icon} width={20} height={20} />
                            {item.label}
                        </StyledListLink>
                    </StyledListItem>
                ))
            }
        </List>
    );
};

export default DefaultLayoutSidebar;