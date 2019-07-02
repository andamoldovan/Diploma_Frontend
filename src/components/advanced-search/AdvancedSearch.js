import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Box} from 'grommet';
import Header from './Header';
import FilterOptions from './FilterOptions';
import SearchResults from './SearchResults';
import {setFilterByDomain, setSolrSearchResults} from "../../actions/appActions";

const AdvancedSearch = (props) => {
    useEffect(() => {
        props.setSolrSearchResults(null);
        props.setFilterByDomain(null);

        if(props.currentUser === null) window.location = "http://locahost:3000";
    }, []);

    return(
        <Box>
            <Header />
            <Box id={"advances-search-split-box"} direction={"row"}>
                <Box id={'left-split-component'}>
                    <FilterOptions />
                </Box>
                <Box id={'right-split-component'}>
                    <SearchResults />
                </Box>
            </Box>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.app.currentUser,
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        setSolrSearchResults: (articles) => {dispatch(setSolrSearchResults(articles))},
        setFilterByDomain: (domain) => {dispatch(setFilterByDomain(domain))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch);