import React, {FC} from 'react';
import {List, ListItem} from "@mui/material";
import {Link} from "react-router-dom";

const CommonSidebar: FC = () => {
    return (
        <List sx={{ width: '300px' }}>
            <ListItem>
                <Link to={'/'}>
                    Home
                </Link>
            </ListItem>
            <ListItem>
                <Link to={'/benches'}>Benches</Link>
            </ListItem>
            <ListItem>
                <Link to={'/benches-moderation'}>Benches moderation</Link>
            </ListItem>
        </List>
    );
};

export default CommonSidebar;