import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Box, FormField, TextInput} from 'grommet';
import {setSolrSearchResults, setSolrResultPage, setIsFilteredSearch} from "../../actions/appActions";
import {solrGetAllArticles, solrSarchByAttribute, solrFullTextSearch} from "../api";

const SearchBar = (props) => {

    let searchText = '';
    useEffect( () => {
        searchQuery('');
        props.setSolrResultPage(1);
    }, []);

    useEffect( () => {
        if(props.isFilteredSearch === false) searchQuery(searchText);
    }, [props.solrResultPage]);

    useEffect( () => {
        props.setSolrResultPage(1);
    }, [props.isFilteredSearch])

    let searchQuery = _.debounce( (text) => {
        if(text === ''){
            if(props.isFilteredSearch !== false) props.setIsFilteredSearch(false);
           solrGetAllArticles(props.currentUser, props.solrResultPage).then(res => {
               props.setSolrSearchResults(res);
           }).catch(ex => {
               console.log("Exception occured at solr search");
               props.setSolrSearchResults([])
           });
        }else{
            if(props.isFilteredSearch !== true) props.setIsFilteredSearch(true);
            selectSearchMode(text);
        }
    }, 500);

    const selectSearchMode = _.debounce( (text) => {
      const {advancedSearchFilter} = props;

      if(advancedSearchFilter.length === 0){
          solrSarchByAttribute(text, "title").then(res => props.setSolrSearchResults(res));
      }else{
          let finalResults = [];
          console.log(_.indexOf(advancedSearchFilter, 'full-text-search'));
          if(_.indexOf(advancedSearchFilter, 'full-text-search') > -1){
              solrFullTextSearch(text).then(res => props.setSolrSearchResults(res));
          }else {
              let finalResults = [];
              let filteredResults = [];
              let result = [];
              advancedSearchFilter.map(element => {
                  if(element !== 'domain') {
                      solrSarchByAttribute(text, element).then(res => {
                          finalResults = res
                      }).then(end => {
                          if (filteredResults.length === 0) {
                              filteredResults = finalResults;
                              result = finalResults;
                          } else {
                              let exists = false
                              finalResults.map(item => {
                                  filteredResults.map(el => {
                                      if (item.id === el.id) exists = true;
                                  });
                                  if (exists === false) result.push(item);
                                  exists = false;
                              });
                              filteredResults = result;
                          }
                          props.setSolrSearchResults(result);
                      });
                  }
              });
          }
      }
    }, 500);

    return(
        <Box id={'search-box'}>
            <FormField  label={"Search"}>
                <TextInput id={'search-text-input'} onChange={(e) => {
                    searchText = e.target.value;
                    searchQuery(e.target.value);
                }} />
            </FormField>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.app.currentUser,
        solrResultPage: state.app.solrResultPage,
        advancedSearchFilter: state.app.advancedSearchFilter,
        isFilteredSearch: state.app.isFilteredSearch,
        solrSearchResults: state.app.solrSearchResults
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        setSolrSearchResults: (articles) => {dispatch(setSolrSearchResults(articles))},
        setSolrResultPage: (page) => {dispatch(setSolrResultPage(page))},
        setIsFilteredSearch: (value) => {dispatch(setIsFilteredSearch(value))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);