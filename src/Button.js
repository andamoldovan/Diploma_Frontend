import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'grommet/components/Button';
import {BUTTON_COUNT} from "./actions/types";
import {buttonCount} from "./actions/appActions";

function handleClick(props) {
    const currentNumber = props.buttonCount;
    props.onButtonClick(currentNumber + 1);
}


const ButtonComp = (props) => {
    console.log(props.buttonCount);
    return(
        <Button id={"main-button"} onClick={() => handleClick(props)}>
            Click
        </Button>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onButtonClick: (count) => {
            dispatch(buttonCount(count))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        buttonCount : state.app.items
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonComp);
