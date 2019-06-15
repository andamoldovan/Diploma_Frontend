import React from 'react';
import {Box, Button} from 'grommet';
import {SearchAdvanced} from "grommet-icons";
import '../../../style/top-headlines.scss';

const AdvancedSearchButton = () => {

    const handleRedirect = () => {
      window.location = "http://localhost:3000/advanced-search";
    };

    return(
        <Box id={"advanced-search-button"}>
            <Button icon={<SearchAdvanced color={'black'}/>} onClick={handleRedirect} />
        </Box>
    );
};

export default AdvancedSearchButton;