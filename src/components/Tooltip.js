import React from 'react';
import {Box, Heading} from 'grommet'

const Tooltip = (props) => {
    const {message} = props;

  return(
      <Box id={"main-tooltip-box"} >
          <Heading level={6} style={{'margin': 0}}> {message} </Heading>
      </Box>
  );
};

export default Tooltip;