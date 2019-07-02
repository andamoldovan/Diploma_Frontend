import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Box} from 'grommet';
import MenuBar from './Menu';
import StartDashboard from './StartDashboard';
import {loggedInUser} from "../../actions/appActions";

const MainPage = (props) => {
    useEffect(() => {
        props.setLoggedInUser(null);
    }, [])

    return(
        <Box>
            <MenuBar />
            <StartDashboard />
        </Box>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInUser : (user) => { dispatch(loggedInUser(user)) },
    }
};

export default connect(null, mapDispatchToProps)(MainPage);