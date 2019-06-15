import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Box, Button, Heading, CheckBox, Grommet} from 'grommet';
import {setAdvancedSearchFilter} from "../../actions/appActions";


const myTheme = {
    checkBox : {
        color: '#9CC2BD',
        border: {
            color: 'black'
        }
    },
    global: {
        colors: {
            control: {'light': '#9CC2BD'},
            text: {'light': 'black'}
        },
    }
};

const FilterOptions = (props) => {
    const [title, setTitle] = useState(false);
    const [author, setAuthor] = useState(false);
    const [source, setSource] = useState(false);
    const [domain, setDomain] = useState(false);
    const [description, setDescription] = useState(false);
    const [content, setContent] = useState(false);
    const [fullTextSearch, setFullTextSearch] = useState(false);
    const [disabledStatus, setDisabledStatus] = useState(false);

    useEffect( () => {
        props.setAdvancedSearchFilter([]);
    }, [])

    useEffect(() => {
        if(disabledStatus){
            setTitle(false); setAuthor(false); setSource(false);
            setDomain(false); setDescription(false); setContent(false);
            props.setAdvancedSearchFilter([]);
        }
    }, [disabledStatus]);

    const handleApplyFilters = () => {
      let filters = [];
      if(title) filters.push('title');
      if(author) filters.push('author');
      if(source) filters.push('source');
      if(domain) filters.push('domain');
      if(description) filters.push('description');
      if(content) filters.push('content');
      props.setAdvancedSearchFilter(filters);
    };

    const handleCancel = () => {
        setTitle(false); setAuthor(false); setSource(false);
        setDomain(false); setDescription(false); setContent(false);
        props.setAdvancedSearchFilter([]);
    };

    return(
        <Box>
            <Grommet theme={myTheme}>
                <Heading alignSelf={"center"} level={3} margin={{left: 'xsmall'}}> Filter </Heading>
                <Box className={'filter-options-element'} margin={{top: 'medium', left: 'small', bottom: 'medium'}}>
                    <Heading className={'filter-options-element'} id={"filter-options-title"} alignSelf={"start"} level={5}> Search By </Heading>
                </Box>
                <Box direction={'column'} margin={{left: 'large'}}>
                    <Box id={'filter-check-box-1'} direction={'row'} margin={{top: 'small', bottom: 'medium'}}>
                        <CheckBox label={'Title'} disabled={disabledStatus} checked={title} onChange={() => setTitle(!title)}/>
                        <CheckBox label={'Author'} disabled={disabledStatus} checked={author} onChange={() => setAuthor(!author)}/>
                    </Box>
                    <Box id={'filter-check-box-2'} direction={'row'} margin={{top: 'small', bottom: 'medium'}}>
                        <CheckBox label={'Source'} disabled={disabledStatus} checked={source} onChange={() => setSource(!source)}/>
                        <CheckBox label={'Domain'} disabled={disabledStatus} checked={domain} onChange={() => setDomain(!domain)}/>
                    </Box>
                    <Box id={'filter-check-box-3'} direction={'row'} margin={{top: 'small', bottom: 'medium'}}>
                        <CheckBox label={'Content'} disabled={disabledStatus} checked={content} onChange={() => setContent(!content)}/>
                        <CheckBox label={'Description'} disabled={disabledStatus} checked={description} onChange={() => setDescription(!description)}/>
                    </Box>
                </Box>
                <Box className={'filter-options-element'} margin={{top: 'medium', left: 'small'}}>
                    <Heading className={'filter-options-element'} id={"predefined-filter-options-title"} alignSelf={"start"} level={5}> Predefined Filters </Heading>
                </Box>
                <Box direction={'column'} margin={{left: 'large'}}>
                    <Box id={'predefined-filter-check-box-1'} direction={'row'} margin={{top: 'small', bottom: 'medium'}}>
                        <CheckBox label={'Full Text Search'} checked={fullTextSearch} onChange={() => {
                            setFullTextSearch(!fullTextSearch);
                            (!fullTextSearch) ? setDisabledStatus(true) : setDisabledStatus(false);
                        }}/>
                    </Box>
                </Box>
                <Box id={'filter-footer'} direction={'row'}>
                    <Button label={'Apply Filters'} onClick={handleApplyFilters} margin={{left: 'medium'}}/>
                    <Button label={'Cancel'} onClick={handleCancel} margin={{left: 'medium'}}/>
                </Box>
            </Grommet>
        </Box>
    );
};


const mapStateToProps = (state) => {
    return {
        advancedSearchFilter: state.app.advancedSearchFilter
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        setAdvancedSearchFilter: (filters) => {dispatch(setAdvancedSearchFilter(filters))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterOptions);