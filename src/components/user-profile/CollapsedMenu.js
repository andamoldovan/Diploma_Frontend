import React from 'react';
import {Box, Layer, Button} from "grommet";
import {loggedInUser} from "../../actions/appActions";
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

    return(
        <Box>
            <Layer className={"user-settings-slider"} full={"vertical"} modal={false} position={'left'}>
                <Button className={'user-settings-icon'} icon={<MailOption color={'black'} />} onClick={() => console.log("mail Option")} />
                <Button className={'user-settings-icon'} icon={<Logout color={'black'}/>} onClick={handleLogout} />
                <Button className={'user-settings-icon'} icon={<Return color={'black'}/>} onClick={handleGoBack} />
            </Layer>
        </Box>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInUser : (user) => { dispatch(loggedInUser(user)) }
    }
};

export default connect(null, mapDispatchToProps)(CollapsedMenu);