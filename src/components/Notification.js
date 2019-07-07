import React, {useEffect, useState} from 'react';
import {Box, Layer, Text, Button} from "grommet";
import {Close} from 'grommet-icons';

const Notification = (props) => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        const {color} = props;
        if(color === 'critical') setStatus('#FF4040');
        if(color === 'status-ok') setStatus('#00C781');
    }, [props.color]);

    return(
        <Box id={'main-notification-box'}>
            <Layer position={'top'} style={{'marginTop': '4%', 'zIndex' : '10000'}}>
                <Box direction={'row'} id={'secondary-notification-box'} style={{'background': status}}>
                    <Text id={'secondary-notification-box-text'} size={'medium'}> {props.message} </Text>
                    <Button icon={<Close />} onClick={props.onClose} />
                </Box>
            </Layer>
        </Box>
    );
};

export default Notification;