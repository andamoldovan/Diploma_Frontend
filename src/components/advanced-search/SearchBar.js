import React, {useState} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Box, FormField, TextInput} from 'grommet';
import {setSolrSearchResults} from "../../actions/appActions";
import {solrGetAllArticles} from "../api";

const SearchBar = (props) => {

    let searchQuery = _.debounce( (text) => {
        if(text === ''){
           solrGetAllArticles(props.currentUser, 1).then(res => {
               props.setSolrSearchResults(res);
               console.log(res);
           });
        }else{
            // solrGetAllArticles().then(res => {
            //
            // })
        }
    }, 500);

    return(
        <Box id={'search-box'}>
            <FormField  label={"Search"}>
                <TextInput id={'search-text-input'} onChange={(e) => searchQuery(e.target.value)} />
            </FormField>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.app.currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        setSolrSearchResults: (articles) => {dispatch(setSolrSearchResults(articles))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);