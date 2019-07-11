import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Box, Layer, Button, Heading, MaskedInput, Grommet} from 'grommet';
import {loggedInUser, setOpenEmailScheduler} from "../../actions/appActions";
import Notification from '../Notification';
import Tooltip from '../Tooltip';
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
    const [tooltip, setTooltip] = useState(false);
    const [input, setInput] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationColor, setNotificationColor] = useState('');
    const inputRegex = /^[0-9]{1,2}[:][0-9]{2}$/;

    const notificationTimeout = () => {
        setTimeout( () => {
           setNotification(false);
        }, 3000);
    };

    const handleButtonClick = () => {
        if(input.match(inputRegex) === null) {
           setNotificationMessage("The time for the schedule is not complete!");
           setNotificationColor('critical');
           setNotification(true);
           notificationTimeout();
        }else{
            let user = props.currentUser;
            user.emailSchedule = input;
            updateEmailSchedule(user).then(res => {
               setNotification(true);
               if(res != null){
                   setNotificationMessage("Successfully updated the email schedule!");
                   setNotificationColor('status-ok');
                   props.setLoggedInUser(user);
                   notificationTimeout();
               }else{
                   setNotificationMessage("Email schedule could not be updated!");
                   setNotificationColor('critical');
                   notificationTimeout();
               }
            });
        }
    };

    let currentEmail = '';
    if(props.currentUser.emailSchedule === "") {
        currentEmail = "No previous email schedule set";
    } else{
        currentEmail = props.currentUser.emailSchedule;
        if(tooltip) setTooltip(false);
    }

    return(
        <Box>
            <Grommet theme={myTheme}>
                <Layer id={'email-settings-layer'} full={'vertical'} position={'right'} onEsc={() => props.setOpenEmailScheduler(false)} onClickOutside={() => props.setOpenEmailScheduler(false)}>
                    <Heading className={"profile-settings-heading"} level={4} alignSelf={"center"}> Email Scheduler </Heading>
                    <Box>
                        <Heading level={5} truncate={true} style={{'maxWidth': '240px'}} onMouseEnter={() => setTooltip(true)} onMouseOut={() => setTooltip(false)}> Email is set at: {currentEmail} </Heading>
                        {tooltip && <Tooltip message={"No previous email schedule set"}/>}
                    </Box>
                    <Box>
                        <MaskedInput id={'masked-input-email'} mask={mask} value={input} onChange={(e) => setInput(e.target.value)} />
                    </Box>
                    <Button id={'email-settings-button'} label={"Update Schedule"} onClick={handleButtonClick}/>
                </Layer>
                {notification && <Notification message={notificationMessage} color={notificationColor} onClose={() => setNotification(false)} />}
            </Grommet>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.app.currentUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setOpenEmailScheduler: (value) => {dispatch(setOpenEmailScheduler(value))},
        setLoggedInUser : (user) => { dispatch(loggedInUser(user)) },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailSettings);