import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Box, Heading, Image, Button} from 'grommet';
import {FormNext, FormPrevious} from "grommet-icons";
import '../../style/user-profile.scss';
import profile2 from '../../images/profile-picture-3.png';
import ProfileSearch from './Search';
import Favorites from './Favorites';
import ExpandedMenu from './ExpandedMenu';
import CollapsedMenu from './CollapsedMenu';
import EmailSettings from './EmailSettings';
import logo from '../../images/logo.png';
import {setsearchedFavoriteArticles} from "../../actions/appActions";


const UserSettings = (props) => {
    const [buttonState, setButtonState] = useState(false);

    useEffect(() => {
        props.setsearchedFavoriteArticles([]);
        if(props.currentUser === null) window.location = "http://localhost:3000";
    }, []);

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
                <Image id={"user-profile-status-image"} src={profile2} cover={"fit"} style={{'background': 'white'}} />
                <Heading className={"user-profile-status-heading"} level={6} alignSelf={"start"}> User name: {props.currentUser.userName}</Heading>
                <Heading className={"user-profile-status-heading"} level={6} alignSelf={"start"}> Articles read: {props.currentUser.readArticles} </Heading>
                <Heading className={"user-profile-status-heading"} level={6} alignSelf={"start"}> Favorite articles: {props.currentUser.favoriteArticles.length} </Heading>
            </Box>
            <Box id={"favorite-articles-box"}>
                <Box id={"profile-cover-box"}>
                    <ProfileSearch />
                    <Box id={"profile-name-box"}>
                        <Heading id={"profile-name"} level={3}> {props.currentUser.lastName} {props.currentUser.firstName} </Heading>
                    </Box>
                    <Image id={"profile-logo"} src={logo} />
                    <Heading id={'profile-title-news-gathering'} level={5}> News Gathering System </Heading>
                </Box>
                <Box id={"profile-favorites-box"}>
                    <Favorites />
                </Box>
            </Box>
            {props.openEmailScheduler && <EmailSettings isOpen={props.openArticleContent} currentUser={props.currentUser}/>}
        </Box>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.app.currentUser,
        openEmailScheduler: state.app.openEmailScheduler
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setsearchedFavoriteArticles: (articles) => {dispatch(setsearchedFavoriteArticles(articles))},
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
