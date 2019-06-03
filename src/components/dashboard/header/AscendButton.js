import React from 'react';
import {Box, Button} from 'grommet';
import {Ascend} from 'grommet-icons';

const AscendButton = () => {

    const handleAscendClick = () => {
        window.scrollTo(0, 0);
    };

    return(
        <Box id={"ascend-main-box"}>
            <Button id={"ascend-button"} icon={<Ascend />} onClick={handleAscendClick} />
        </Box>
    );
};

export default AscendButton;
