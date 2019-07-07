import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Box, Button, Heading, CheckBox, Grommet, DropButton} from 'grommet';
import {setAdvancedSearchFilter, setFilterByDomain} from "../../actions/appActions";
import Notification from '../Notification';

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
        focus: {
            border: {
                color: '#9CC2BD',
            }
        }
    }
};

const dropMenuButton = {
    global: {
        colors: {
            control: {'light': 'white'},
            text: {'light': 'black'}
        },
    },
    text: {
        medium: {
            height: '16px'
        }
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
    const [notification, setNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState(false);

    useEffect( () => {
        props.setAdvancedSearchFilter([]);
    }, [])

    useEffect(() => {
        if(disabledStatus){
            setTitle(false); setAuthor(false); setSource(false);
            setDomain(false); setDescription(false); setContent(false);
            //props.setAdvancedSearchFilter([]);
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
      if(fullTextSearch) filters.push('full-text-search');
      props.setAdvancedSearchFilter(filters);
      setNotificationMsg("Filters applied successfully!");
      setNotification(true);
      setTimeout(() => {
          setNotification(false);
      }, 2000);
    };

    const handleCancel = () => {
        setTitle(false); setAuthor(false); setSource(false);
        setDomain(false); setDescription(false); setContent(false);
        props.setAdvancedSearchFilter([]);
        setNotificationMsg("Filters removed successfully!");
        setNotification(true);
        setTimeout(() => {
            setNotification(false);
        }, 2000);
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
                    <Box id={'filter-check-box-3'} direction={'row'} margin={{top: 'small', bottom: 'medium'}}>
                        <CheckBox label={'Content'} disabled={disabledStatus} checked={content} onChange={() => setContent(!content)}/>
                        <CheckBox label={'Description'} disabled={disabledStatus} checked={description} onChange={() => setDescription(!description)}/>
                    </Box>
                    <Box id={'filter-check-box-2'} direction={'row'} margin={{top: 'small', bottom: 'medium'}}>
                        <CheckBox label={'Source'} disabled={disabledStatus} checked={source} onChange={() => setSource(!source)}/>
                        <DropButton label={"Domain"} dropAlign={{top: 'bottom', right: 'right'}} onOpen={() =>props.setFilterByDomain(null)} dropContent={
                            <Grommet theme={dropMenuButton}>
                                <Box>
                                    <Button label={"all domains"} onClick={() => props.setFilterByDomain(null)}/>
                                    <Button label={"headlines"} onClick={() => props.setFilterByDomain('headlines')}/>
                                    <Button label={"business"} onClick={() => props.setFilterByDomain('business')}/>
                                    <Button label={"entertainment"} onClick={() => props.setFilterByDomain('entertainment')}/>
                                    <Button label={"general"} onClick={() => props.setFilterByDomain('general')}/>
                                    <Button label={"health"} onClick={() => props.setFilterByDomain('health')}/>
                                    <Button label={"science"} onClick={() => props.setFilterByDomain('science')}/>
                                    <Button label={"sports"} onClick={() => props.setFilterByDomain('sports')}/>
                                    <Button label={"technology"} onClick={() => props.setFilterByDomain('technology')}/>
                                </Box>
                            </Grommet>
                        }/>
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
                {notification && <Notification message={notificationMsg} color={'status-ok'} onClose={() => setNotification(false)}/>}
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
        setAdvancedSearchFilter: (filters) => {dispatch(setAdvancedSearchFilter(filters))},
        setFilterByDomain: (domain) => {dispatch(setFilterByDomain(domain))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterOptions);