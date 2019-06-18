import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Box} from 'grommet';
import _ from 'lodash';
import Article from './Article';
import PageBar from './PageBar';

const SearchResults = (props) => {
    const {solrSearchResults, solrResultPage, isFilteredSearch} = props;

   let arr = [];
   let result = [];
   let displayValues = null;
   if(solrSearchResults != null) {
       solrSearchResults.map(element => {
           if(props.filterByDomain !== null){
               if(element.domain === props.filterByDomain) arr.push(<Article data={element} />)
           }else
                arr.push(<Article data={element} />)
       });
       result = _.chunk(arr, 5);
   } else arr=null;

    displayValues = (isFilteredSearch) ? result[solrResultPage - 1] : arr;

  return(
      <Box>
          {displayValues}
          <Box>
              <PageBar />
          </Box>
      </Box>
  );
};

const mapStateToProps = (state) => {
    return {
        solrSearchResults: state.app.solrSearchResults,
        solrResultPage: state.app.solrResultPage,
        isFilteredSearch: state.app.isFilteredSearch,
        filterByDomain: state.app.filterByDomain
    }
};

export default connect(mapStateToProps, null)(SearchResults);