import React from 'react';
import {Box} from 'grommet';
import Header from './Header';
import FilterOptions from './FilterOptions';

const AdvancedSearch = () => {
    return(
        <Box>
            <Header />
            <Box id={"advances-search-split-box"} direction={"row"}>
                <Box id={'left-split-component'}>
                    <FilterOptions />
                </Box>
                <Box id={'right-split-component'}>
                    Right
                </Box>
            </Box>
        </Box>
    );
};

export default AdvancedSearch;