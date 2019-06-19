import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Box, Layer, Button, Heading, MaskedInput, Grommet} from 'grommet';
import {loggedInUser, setOpenEmailScheduler} from "../../actions/appActions";
import Notification from '../Notification';
import {updateEmailSchedule} from "../api";

const myTheme = {
    global: {
        colors: {
            control: {'light': '#9CC2BD'},
            text: {'light': 'black'}
        },
    },
    layer: {
        background: '#EDEDED'
    }
};

const mask = [
    {
        length: 2,
        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00'],
        regexp: /^[0-9]{1,2}$/,
        placeholder: 'hh',
    },
    {fixed: ':'},
    {
        length: 2,
        options: ['00', '30'],
        regexp: /^[0-9]{2}$/,
        placeholder: 'mm',
    }
];

const EmailSettings = (props) => {
    const [notification, setNotification] = useState(false);
    const [input, setInput] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const inputRegex = /^[0-9]{1,2}[:][0-9]{2}$/;

    const notificationTimeout = () => {
        setTimeout( () => {
           setNotification(false);
        }, 3000);
    };

    const handleButtonClick = () => {
        if(input.match(inputRegex) === null) {
           setNotificationMessage("The time for the schedule is not complete!");
           setNotification(true);
           notificationTimeout();
        }else{
            let user = props.currentUser;
            user.emailSchedule = input;
            updateEmailSchedule(user).then(res => {
               setNotification(true);
               if(res != null){
                   setNotificationMessage("Successfully updated the email schedule!");
                   props.setLoggedInUser(user);
                   notificationTimeout();
               }else{
                   setNotificationMessage("Email schedule could not be updated!");
                   notificationTimeout();
               }
            });
        }
    };

    return(
        <Box>
            <Grommet theme={myTheme}>
                <Layer id={'email-settings-layer'} full={'vertical'} position={'right'} onEsc={() => props.setOpenEmailScheduler(false)} onClickOutside={() => props.setOpenEmailScheduler(false)}>
                    <Heading className={"profile-settings-heading"} level={4} alignSelf={"center"}> Email Scheduler </Heading>
                    <Box>
                        <MaskedInput id={'masked-input-email'} mask={mask} value={input} onChange={(e) => setInput(e.target.value)} />
                    </Box>
                    <Button id={'email-settings-button'} label={"Update Schedule"} onClick={handleButtonClick}/>
                </Layer>
                {notification && <Notification message={notificationMessage} onClose={() => setNotification(false)} />}
            </Grommet>
        </Box>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        setOpenEmailScheduler: (value) => {dispatch(setOpenEmailScheduler(value))},
        setLoggedInUser : (user) => { dispatch(loggedInUser(user)) },
    }
};

export default connect(null, mapDispatchToProps)(EmailSettings);