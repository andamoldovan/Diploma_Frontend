import React from 'react';
import {Box, Menu} from 'grommet';
import {User} from 'grommet-icons';
import '../../style/main-page.scss'

const MenuBar = () => {

    const menuItems = [{label: "Login", onClick: () => {window.location = "http://localhost:3000/login"}},
                        {label: "Register", onClick: () => {window.location = "http://localhost:3000/register"}}];
    return(
        <Box id={"main-page-menu-bar"} direction={"row"}>
            <Box>
                <Menu icon={<User color={'black'} />} items={menuItems} />
            </Box>
        </Box>
    );
};

export default MenuBar;