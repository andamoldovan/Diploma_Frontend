import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Box} from 'grommet';
import _ from 'lodash';
import Article from './Article';
import PageBar from './PageBar';
import Loading from '../Loading';

const SearchResults = (props) => {
    const {solrSearchResults, solrResultPage, isFilteredSearch} = props;
    const [loading, setLoading] = useState(false);

   let arr = [];
   let result = [];
   let displayValues = null;
   if(solrSearchResults != null && solrSearchResults.length > 0) {
       solrSearchResults.map(element => {
           if(props.filterByDomain !== null){
               if(element.domain === props.filterByDomain) arr.push(<Article data={element} />)
           }else
                arr.push(<Article data={element} />)
       });
       result = _.chunk(arr, 5);
   } else arr=null;

    displayValues = (isFilteredSearch) ? result[solrResultPage - 1] : arr;

    useEffect(() => {
        if(displayValues == null) setLoading(true);
           else {
               if(displayValues.length === 0) setLoading(true);
               else setLoading(false);
           }
    }, [displayValues]);

    useEffect(() => {
        if((result === undefined) || (arr != null)) {
            if(result === undefined) setLoading(false);
            if((Math.ceil(arr.length / 5) <= (solrResultPage - 1))) setLoading(false);
        }
    }, [result, arr]);

  return(
      <Box>
          {loading && <Loading />}
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