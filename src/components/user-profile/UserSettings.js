import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Box, Heading, Image, Button} from 'grommet';
import {FormNext, FormPrevious} from "grommet-icons";
import '../../style/user-profile.scss';
import profile2 from '../../images/profile-picture-3.jpg';
import Search from './Search';
import Favorites from './Favorites';
import ExpandedMenu from './ExpandedMenu';
import CollapsedMenu from './CollapsedMenu';

const UserSettings = (props) => {
    const [buttonState, setButtonState] = useState(false);

    let buttonId = 'collapsed-button';
    let buttonIcon = <FormNext color={'black'} />;

    let menuComponent = null;
    if(buttonState === false){
        menuComponent = <CollapsedMenu />;
        buttonId = 'collapsed-button';
        buttonIcon = <FormNext color={'black'} />;
    }else{
        menuComponent = <ExpandedMenu />;
        buttonId = 'expanded-button';
        buttonIcon = <FormPrevious color={'black'} />;
    }


    return(
        <Box>
            {menuComponent}
            <Button id={buttonId} icon={buttonIcon} onClick={() => setButtonState(!buttonState)} />
            <Box id={"profile-status-box"}>
                <Image id={"user-profile-status-image"} src={profile2} cover={"fit"} />
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
                <Box id={"profile-favorites-box"}>
                    <Favorites />
                </Box>
            </Box>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.app.currentUser,
    }
};

// const mapDispatchToProps = dispatch => {
//     return {
//         setLoggedInUser : (user) => { dispatch(loggedInUser(user)) }
//     }
// };

export default connect(mapStateToProps, null)(UserSettings);
