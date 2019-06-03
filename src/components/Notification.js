import React from 'react';
import {Box, Layer, Text, Button} from "grommet";
import {Close} from 'grommet-icons';

const Notification = (props) => {
    return(
        <Box id={'main-notification-box'}>
            <Layer position={'top'} style={{'marginTop': '4%', 'zIndex' : '10000'}}>
                <Box direction={'row'} id={'secondary-notification-box'}>
                    <Text size={'medium'}> {props.message} </Text>
                    <Button icon={<Close />} onClick={props.onClose} />
                </Box>
            </Layer>
        </Box>
    );
};

export default Notification;