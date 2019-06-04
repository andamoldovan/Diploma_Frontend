import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Box, Layer, Heading, Image} from 'grommet';
import '../../style/user-profile.scss';
import profile from '../../images/profile-picture.png';
import Search from './Search';
import {loggedInUser} from "../../actions/appActions";
import Favorites from './Favorites';

const UserSettings = (props) => {

    const handleLogout = () => {
        props.setLoggedInUser(null);
        window.location = "http://localhost:3000/login";
    };

    const handleGoBack = () => {
        window.location = "http://localhost:3000/main-page";
    };

    return(
        <Box>
            <Box>
                <Layer id={"user-settings-slider"} full={"vertical"} modal={false} position={'left'}>
                    <Heading level={4} alignSelf={"center"}> User Settings </Heading>
                    <Heading level={5} alignSelf={"start"}> Email Settings </Heading>
                    <Heading id={"profile-logout"} level={5} alignSelf={"start"} onClick={handleLogout}> Logout </Heading>
                    <Heading id={"profile-back"} level={5} alignSelf={"start"} onClick={handleGoBack}> Return </Heading>
                </Layer>
            </Box>
            <Box id={"profile-status-box"}>
                <Image id={"user-profile-status-image"} src={profile} cover={"fit"} />
                <Heading className={"user-profile-status-heading"} level={6} alignSelf={"start"}> User name </Heading>
                <Heading className={"user-profile-status-heading"} level={6} alignSelf={"start"}> Articles read </Heading>
                <Heading className={"user-profile-status-heading"} level={6} alignSelf={"start"}> Favorite articles </Heading>
            </Box>
            <Box id={"favorite-articles-box"}>
                <Box id={"profile-cover-box"}>
                    <Search />
                    <Box id={"profile-name-box"}>
                        <Heading id={"profile-name"} level={3}> {props.currentUser.lastName} {props.currentUser.firstName} </Heading>
                    </Box>
                </Box>
                <Favorites />
            </Box>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.app.currentUser,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInUser : (user) => { dispatch(loggedInUser(user)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
