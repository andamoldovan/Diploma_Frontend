import React from 'react';
import {connect} from 'react-redux';
import {Box} from 'grommet/components/Box';
import ButtonComp from "./Button";


const Main = (props) => {
    console.log(props.buttonCount);
    return(
        <Box>
            <Box>
                <p> You clicked {props.buttonCount} times</p>
                <ButtonComp />
            </Box>
        </Box>
    );
};



const mapStateToProps = (state) => {
    return {
        buttonCount : state.app.items
    }
};

export default connect(mapStateToProps, null)(Main);

