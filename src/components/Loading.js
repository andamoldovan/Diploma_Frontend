import React from 'react';
import {Box, Heading, Image} from 'grommet';
import logo from '../images/logo.png';

const Loading = () => {
    return(
        <Box id={'loading-box'}>
            <Image style={{'width': '150px', 'marginLeft': '40%'}} id={'loading-image'} src={logo} />
            <Heading id={'loading-title'} style={{'marginTop': '0px', 'marginLeft': '43%'}} level={5}> Loading... </Heading>
        </Box>
    );
};

export default Loading;