import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Box, Image, Text} from 'grommet';
import '../../style/register.scss';
import {registerNewUser, setNewUserPreferences} from "../../actions/appActions";

const NewsSubject = (props) => {
    const [opacity, setOpacity] = useState('strong');
    const [clicked, setClicked] = useState(false);

    let opacityValue;
    if(clicked === false) opacityValue = opacity;
    else opacityValue = true;

    let style, imageStyle;
    if(props.text === 'Health'){
        style = { objectFit: 'initial', width: '450px', height: '350px', position: 'relative'};
        imageStyle = {position: 'absolute', marginTop: '8%', marginLeft: '8%'};
    }else
        if(props.text === 'Technology' || props.text === 'Entertainment') {
        style = {objectFit: 'initial', width: '450px', height: '450px', position: 'relative'};
        imageStyle = {position: 'absolute', marginTop: '8%', marginLeft: '7%'};
    }else{
        style = {objectFit: 'initial', width: '450px', height: '450px', position: 'relative'};
        imageStyle = {position: 'absolute', marginTop: '8%', marginLeft: '8%'};
    }

    const handleClick = () => {
        setClicked(!clicked);
        let currentUser = props.registerNewUser;
        let currentPreferences = props.registerNewUser.preferences;
        if(currentPreferences.includes(props.text.toLowerCase())){
            let updatedPreferences = [];
            currentPreferences.map(element => {
                if(element !== props.text.toLowerCase()) updatedPreferences.push(element);
            } );
            currentUser.preferences = updatedPreferences;
            props.setRegisterNewUser(currentUser);
        }else{
            currentPreferences.push(props.text.toLowerCase());
            currentUser.preferences = currentPreferences;
            props.setRegisterNewUser(currentUser);
        }
    };

    return(
        <Box id={"news-preference-main-box"} fill={true} onClick={handleClick} >
            <Image id="preference-image" fit={"contain"} opacity={opacityValue} onMouseEnter={() => setOpacity('medium')} onMouseLeave={() => setOpacity('strong')} src={props.image} style={style}/>
            <Box id={"news-preference-text"} style={imageStyle}>
                <Text size={"xxlarge"} weight={"bold"} onMouseEnter={() => setOpacity('medium')} onMouseLeave={() => setOpacity('strong')}> {props.text} </Text>
            </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsSubject);