import React from 'react';
import {connect} from 'react-redux';
import {Box, Layer, Heading, Button} from "grommet";
import {loggedInUser} from "../../actions/appActions";

const ExpandedMenu = (props) => {

    const handleLogout = () => {
        props.setLoggedInUser(null);
        window.location = "http://localhost:3000/login";
    };

    const handleGoBack = () => {
        window.location = "http://localhost:3000/main-page";
    };

    return(
        <Box>
            <Layer className={"user-settings-slider"} full={"vertical"} modal={false} position={'left'}>
                <Heading id={"profile-settings-heading"} level={4} alignSelf={"center"}> User Settings </Heading>
                <Button className={"profile-settings-button"} id={"profile-email"} label={"Email Settings"} onClick={() => console.log("Email Settings")} />
                <Button className={"profile-settings-button"} id={"profile-logout"} label={"Logout"} onClick={handleLogout} />
                <Button className={"profile-settings-button"} id={"profile-back"} label={"Return"} onClick={handleGoBack} />
            </Layer>
        </Box>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInUser : (user) => { dispatch(loggedInUser(user)) }
    }
};

export default connect(null, mapDispatchToProps)(ExpandedMenu);

