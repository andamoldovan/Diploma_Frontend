import React, {useState} from 'react';
import {Box, FormField, TextInput} from 'grommet';

const SearchBar = () => {
    const [search, setSearch] = useState('');

    return(
        <Box id={'search-box'}>
            <FormField  label={"Search"}>
                <TextInput id={'search-text-input'} value={search} onChange={(e) => setSearch(e.target.value)} />
            </FormField>
        </Box>
    );
};

export default SearchBar;