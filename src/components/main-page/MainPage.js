import React from 'react';
import {Box, Heading} from 'grommet';
import MenuBar from './Menu';

const MainPage = () => {
    return(
        <Box>
            <Heading  id={"main-page-title"} level={2} selfAlign={"centre"}>
                Main Page
            </Heading>
            <MenuBar />
        </Box>
    );
};

export default MainPage;