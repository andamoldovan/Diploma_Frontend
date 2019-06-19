import React from 'react';
import {Box, Layer, Button} from "grommet";
import {loggedInUser, setOpenEmailScheduler} from "../../actions/appActions";
import connect from "react-redux/es/connect/connect";
import {MailOption, Logout, Return, SettingsOption} from "grommet-icons";

const CollapsedMenu = (props) => {

    const handleLogout = () => {
        props.setLoggedInUser(null);
        window.location = "http://localhost:3000/login";
    };

    const handleGoBack = () => {
        window.location = "http://localhost:3000/main-page";
    };

    const handleEmailSchedule = () => {
        props.setOpenEmailScheduler(true);
    };

    return(
        <Box>
            <Layer className={"user-settings-slider"} full={"vertical"} modal={false} position={'left'}>
                <Button className={'user-settings-icon'} icon={<MailOption color={'black'} />} onClick={handleEmailSchedule} />
                <Button className={'user-settings-icon'} icon={<Logout color={'black'}/>} onClick={handleLogout} />
                <Button className={'user-settings-icon'} icon={<Return color={'black'}/>} onClick={handleGoBack} />
            </Layer>
        </Box>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInUser : (user) => { dispatch(loggedInUser(user)) },
        setOpenEmailScheduler: (value) => {dispatch(setOpenEmailScheduler(value))}
    }
};

export default connect(null, mapDispatchToProps)(CollapsedMenu);