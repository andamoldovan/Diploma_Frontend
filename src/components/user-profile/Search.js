import React, {useState} from 'react';
import {Box, TextInput} from 'grommet';
import {Search} from 'grommet-icons';

const ProfileSearch = () => {
    const [searchText, setSearchText] = useState('');

    return(
        <Box id={"profile-search-box"}>
            <Search color={'black'}/>
            <TextInput id={"search-input"} onChange={(event) => setSearchText(event.target.value)}/>
        </Box>
    );
};

export default ProfileSearch;