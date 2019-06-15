import React from 'react'
import {Box, Button} from "grommet/es6";
import '../../style/advanced-search.scss';
import {Return} from 'grommet-icons';
import AscendButton from "../dashboard/header/AscendButton";
import SearchBar from './SearchBar';

const Header = () => {
    const handleReturnClick = () => {
        window.location = "http:/localhost:3000/main-page";

    };
    return(
        <Box className={"headlines-menu-bar"} direction={"row"}>
            <AscendButton color={'black'}/>
            <Box>
                <Button id={'search-return-button'} icon={<Return color={'black'}/>} onClick={handleReturnClick} />
            </Box>
            <Box>
                <SearchBar />
            </Box>
        </Box>
    );
};

export default Header;