import React, { useState} from 'react';
import {connect} from "react-redux";
import {Box, Button, Heading} from 'grommet';
import NewsSubject from './NewsSubject';
import {registerUser} from '../api';
import Notification from '../Notification';

import business from '../../images/business.jpg';
import sport from '../../images/sport.jpg';
import science from '../../images/science.jpg';
import general from '../../images/general.jpg';
import entartainment from '../../images/entertainment.jpg';
import health from '../../images/health.jpg';
import technology from '../../images/technology.jpg';


const Preferences = (props) => {
    const [notification, setNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState('');

    const handleFinishRegistration = () => {
        let user = props.registerNewUser;
        if(user.preferences.length < 2){
            setNotification(true);
            setNotificationMsg("You cannot register without selecting at least 2 news topics");
            setTimeout(() => {
                setNotification(false);
            }, 1500);
        }else{
            setNotification(true);
            setNotificationMsg("Congratulations! Your registration is complete. You will be redirected to the main page");
            setTimeout(() => {
                setNotification(false);
            }, 3000);
            registerUser(user).then( res => {
                setTimeout(() => {
                    window.location = "http://localhost:3000";
                }, 2000);
            });
        }
    };

    return(
        <Box>
            <Box id={"preferences-heading"}>
                <Heading level={1} textAlign={"center"}> Choose your favorite news subjects! </Heading>
            </Box>
            <Box id={"preferences-topics-box"}>
                <NewsSubject text={"Business"} image={business} />
                <NewsSubject text={"Sports"} image={sport} />
                <NewsSubject text={"Science"} image={science} />
                <NewsSubject text={"General"} image={general} />
                <NewsSubject text={"Entertainment"} image={entartainment} />
                <NewsSubject text={"Technology"} image={technology} />
                <NewsSubject text={"Health"} image={health} />
            </Box>
            <Box>
                <Button id={'finish-registration-button'} label={"Finish"} onClick={handleFinishRegistration}/>
            </Box>
            {notification && <Notification message={notificationMsg} onClose={() => setNotification(false)}/>}
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        registerNewUser: state.app.registerNewUser
    }
};


export default connect(mapStateToProps, null)(Preferences);