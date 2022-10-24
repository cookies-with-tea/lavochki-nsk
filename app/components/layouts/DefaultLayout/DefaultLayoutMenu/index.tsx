import React, {FC, useState} from 'react';
import {menuItems} from "@/app/components/layouts/DefaultLayout/DefaultLayoutMenu/menu.constants";
import {
    StyledLink,
    StyledLogoutButton,
    StyledMenuItem
} from "@/app/components/layouts/DefaultLayout/DefaultLayoutMenu/styles";
import Link from "next/link";
import CommonIcon from "@/app/components/common/CommonIcon";
import {Menu} from "@mui/material";

const DefaultLayoutMenu: FC<any> = (): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleAnchorSet = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (): void => {
        setAnchorEl(null);
    };

    return (
        <div></div>
        // <Menu
        //     id="profile-menu"
        //     anchorEl={anchorEl}
        //     open={open}
        //     onClose={handleMenuClose}
        //     MenuListProps={{
        //         style: {
        //             padding: 0,
        //         },
        //         'aria-labelledby': 'profile-button',
        //     }}
        //     disableAutoFocusItem
        //     PaperProps={{
        //         style: {
        //             transform: 'translateY(33px)',
        //         }
        //     }}
        //     anchorOrigin={{
        //         vertical: 'bottom',
        //         horizontal: 'right',
        //     }}
        //     transformOrigin={{
        //         vertical: 'top',
        //         horizontal: 'right',
        //     }}
        // >
        //     { menuItems.map((item) => (
        //         <StyledMenuItem key={item.title}>
        //             <Link href={item.url as string} passHref>
        //                 <StyledLink className="menu__link">
        //                     <div>{item.title}</div>
        //                     <CommonIcon
        //                         name={item.icon}
        //                         width={24}
        //                         height={24}
        //                         fillColor="#49260A"
        //                     />
        //                 </StyledLink>
        //             </Link>
        //         </StyledMenuItem>
        //     )) }
        //     <StyledMenuItem>
        //         <StyledLogoutButton className="menu__link">
        //             <div>
        //                 Выйти
        //             </div>
        //             <CommonIcon
        //                 name="logout"
        //                 width={24}
        //                 height={24}
        //                 fillColor="#49260A"
        //             />
        //         </StyledLogoutButton>
        //     </StyledMenuItem>
        // </Menu>
    );
};

export default DefaultLayoutMenu;