import React, { useState, useEffect} from 'react';
import {connect} from "react-redux";
import {Box, Button, Heading, Grommet} from 'grommet';
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
import {registerNewUser} from "../../actions/appActions";

const myTheme = {
    global: {
        colors: {
            control: {'light': '#9CC2BD'},
            text: {'light': 'black'}
        },
    }
};

const Preferences = (props) => {
    const [notification, setNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState('');
    const [notificationColor, setNotificationColor] = useState('');

    useEffect(() => {
        if(props.registerNewUser === null) window.location = "http://localhost:3000/register";
    }, [])

    const handleFinishRegistration = () => {
        let user = props.registerNewUser;
        if(user.preferences.length < 2){
            setNotification(true);
            setNotificationMsg("You cannot register without selecting at least 2 news topics");
            setNotificationColor('critical');
            setTimeout(() => {
                setNotification(false);
            }, 1500);
        }else{
            registerUser(user).then( res => {
                if(res.id !== null) {
                    setNotification(true);
                    setNotificationMsg("Congratulations! Your registration is complete. You will be redirected to the main page");
                    setNotificationColor('status-ok');
                    props.setRegisterNewUser(null);
                    setTimeout(() => {
                        setNotification(false);
                    }, 3000);
                    setTimeout(() => {
                        window.location = "http://localhost:3000";
                    }, 2000);
                }else{
                    setNotification(true);
                    setNotificationMsg("User already exists, choose another one!");
                    setNotificationColor('critical');
                    setTimeout(() => {
                        setNotification(false);
                    }, 3000);
                    setTimeout(() => {
                        window.location = "http://localhost:3000/register";
                    }, 2000);
                }
            });
        }
    };

    return(
        <Box>
            <Grommet theme={myTheme}>
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
                {notification && <Notification message={notificationMsg} color={notificationColor} onClose={() => setNotification(false)}/>}
            </Grommet>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        registerNewUser: state.app.registerNewUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setRegisterNewUser : (user) => {dispatch(registerNewUser(user))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);