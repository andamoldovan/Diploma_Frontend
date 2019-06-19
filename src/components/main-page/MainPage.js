import React from 'react';
import {Box, Heading} from 'grommet';
import MenuBar from './Menu';
import StartDashboard from './StartDashboard';

const MainPage = () => {
    return(
        <Box>
            <MenuBar />
            <StartDashboard />
        </Box>
    );
};

export default MainPage;