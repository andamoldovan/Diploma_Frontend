import React from 'react';
import {connect} from "react-redux";
import {Box, Menu} from "grommet";
import {User, SettingsOption, Logout} from 'grommet-icons';
import {loggedInUser} from "../../actions/appActions";
import '../../style/user-profile.scss';
import {logout} from "../api";
import {updateReadArticles} from "../api";

const UserProfile = (props) => {

    let menuItems = [
        {label: 'Logout',  icon: <Logout/>, onClick: () => handleLogoutClick()},
        {label: 'Settings', icon: <SettingsOption/>, onClick: () => handleUserSettingsClick()}
    ];

    const handleUserSettingsClick = () => {
        updateReadArticles(props.currentUser).then(res => console.log("updated read articles" + res));
        window.location="http://localhost:3000/user-settings"
    };

    const handleLogoutClick = () => {
        logout(props.currentUser).then(res => console.log(res));
        updateReadArticles(props.currentUser).then(res => console.log("updated read articles" + res));
        props.setLoggedInUser(null);
        window.location = "http://localhost:3000/login";
    };

    return(
        <Box id={"main-user-profile"}>
            <Menu icon={<User color={'black'} />} items={menuItems} />
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
        setLoggedInUser : (user) => { dispatch(loggedInUser(user)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (UserProfile);