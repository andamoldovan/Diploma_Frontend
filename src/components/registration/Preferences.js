import React, { useEffect} from 'react';
import {connect} from "react-redux";
import {Box, Button, Heading} from 'grommet';
import NewsSubject from './NewsSubject';
import {registerUser} from '../api';

import business from '../../images/business.jpg';
import sport from '../../images/sport.jpg';
import science from '../../images/science.jpg';
import general from '../../images/general.jpg';
import entartainment from '../../images/entertainment.jpg';
import health from '../../images/health.jpg';
import technology from '../../images/technology.jpg';


const Preferences = (props) => {

    const handleFinishRegistration = () => {
        let user = props.registerNewUser;
        registerUser(user).then( res => console.log(res));

        window.location = "http://localhost:3000";
    };

    return(
        <Box>
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
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        registerNewUser: state.app.registerNewUser
    }
};


export default connect(mapStateToProps, null)(Preferences);