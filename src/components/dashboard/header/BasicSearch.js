import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Box, TextInput, Button} from "grommet";
import {Search} from 'grommet-icons';
import _ from 'lodash';
import {basicSearch} from "../../api";
import {searchedArticles} from "../../../actions/appActions";
import Notification from '../../Notification';

const BasicSearch = (props) => {
    const [state, setState] = useState(false);
    const [notification, setNotification] = useState(false);

    let searchQuery = _.debounce((text) => {
        if(text === ''){
            props.setSearchedArticles([]);
        }else{
            basicSearch(props.domainPage, text).then( res => {
                props.setSearchedArticles(res);
                if(res.length === 0) setNotification(true);
            });
        }
        }, 500);

    let noResultsNotification = (notification === true) ? <Notification onClose={() => setNotification(false)} message={"No results returned for the search!"}/> : null;

    let openState = (state === true) ? <Box id={"basic-search-box-open"} direction={"row"}>
                                             <TextInput id={"basic-search-text"} onChange={event => searchQuery(event.target.value)}/>
                                             <Button id={"basic-search-icon"} icon={<Search/>} onClick={() => setState(false)} />
                                       </Box>
                                    : <Box id={"basic-search-box-close"} direction={"row"}>
                                             <Button id={"basic-search-icon"} icon={<Search/>} onClick={() => setState(true)}/>
                                      </Box>;

    return(
        <Box>
             {noResultsNotification}
             {openState}
        </Box>
    );
};

const mapStateToProps = (state) => {
    return{
        searchedArticles: state.app.searchedArticles,
        domainPage: state.app.domainPage
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        setSearchedArticles: (articles) => {dispatch(searchedArticles(articles))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicSearch);