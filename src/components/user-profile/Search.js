import React, {useState} from 'react';
import {Box, TextInput} from 'grommet';

const Search = () => {
    const [searchText, setSearchText] = useState('');

    return(
        <Box id={"profile-search-box"}>
            <TextInput id={"search-input"} onChange={(event) => setSearchText(event.target.value)}/>
        </Box>
    );
};

export default Search;