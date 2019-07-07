import React from 'react';
import {connect} from 'react-redux';
import {Box, Button, Heading} from 'grommet';
import {ChapterNext, ChapterPrevious} from "grommet-icons";
import {setSolrResultPage} from "../../actions/appActions";

const PageBar = (props) => {

    const handleNext = () => {
        const next = props.solrResultPage + 1;
        if(props.isFilteredSearch && props.solrSearchResults != null){
            (Math.ceil(props.solrSearchResults.length / 5) > (props.solrResultPage)) ? props.setSolrResultPage(next) : props.setSolrResultPage(next - 1);;
        }else{
            props.setSolrResultPage(next);
        }

    };

    const handlePrevious = () => {
        let next =  props.solrResultPage;
        (next > 1) ? props.setSolrResultPage(next - 1) : props.setSolrResultPage(next);
    };

  return(
      <Box id={'page-selector-box'} direction={'row'}>
          <Button id={'prev-chapter-button'} icon={<ChapterPrevious color={'black'} />} onClick={handlePrevious} />
          <Heading id={'page-number-heading'} level={3}> {props.solrResultPage} </Heading>
          <Button id={"next-chapter-button"} icon={<ChapterNext color={'black'}/>} onClick={handleNext}/>
      </Box>
  );
};


const mapStateToProps = (state) => {
    return {
        solrResultPage: state.app.solrResultPage,
        solrSearchResults: state.app.solrSearchResults,
        isFilteredSearch: state.app.isFilteredSearch,
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        setSolrResultPage: (page) => {dispatch(setSolrResultPage(page))}
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PageBar);