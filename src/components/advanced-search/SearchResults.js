import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Box} from 'grommet';
import Article from './Article';

const SearchResults = (props) => {

   let arr = [];
   if(props.solrSearchResults != null) {
       props.solrSearchResults.map(element => {
           console.log(element.url);
           arr.push(<Article data={element} />)
       })
   } else arr=null;

  return(
      <Box>
          {arr}
      </Box>
  );
};

const mapStateToProps = (state) => {
    return {
        solrSearchResults: state.app.solrSearchResults
    }
};

export default connect(mapStateToProps, null)(SearchResults);