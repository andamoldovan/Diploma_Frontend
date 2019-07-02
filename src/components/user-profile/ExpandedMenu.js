import React from 'react';
import {connect} from 'react-redux';
import {Box, Layer, Heading, Button} from "grommet";
import {loggedInUser, setOpenEmailScheduler} from "../../actions/appActions";

const ExpandedMenu = (props) => {

    const handleLogout = () => {
        props.setLoggedInUser(null);
        window.location = "http://localhost:3000";
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
                <Heading className={"profile-settings-heading"} level={4} alignSelf={"center"}> User Settings </Heading>
                <Button className={"profile-settings-button"} id={"profile-email"} label={"Email Settings"} onClick={handleEmailSchedule} />
                <Button className={"profile-settings-button"} id={"profile-logout"} label={"Logout"} onClick={handleLogout} />
                <Button className={"profile-settings-button"} id={"profile-back"} label={"Return"} onClick={handleGoBack} />
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

export default connect(null, mapDispatchToProps)(ExpandedMenu);

