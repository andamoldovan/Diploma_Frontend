import React from 'react';
import {connect} from "react-redux";
import {Box, Heading} from "grommet";
import '../../../style/top-headlines.scss';
import Preference from './Preference';

const MadeForYou = (props) => {

    let preferences = props.currentUser.preferences;
    let prefArray = [];
    preferences.map(preference => {
        prefArray.push(<Preference domain={preference} />);
        return null;
    });

    return(
        <Box id={"made-for-you-main-box"} direction={"column"} fill={true}>
            <Box id={"made-for-you-title"}>
                <Heading level={1} margin={'xsmall'} className={'main-page-titles-class'}> Articles Made for You </Heading>
            </Box>
            {prefArray}
        </Box>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.app.currentUser,
    }
};

export default connect(mapStateToProps, null)(MadeForYou);