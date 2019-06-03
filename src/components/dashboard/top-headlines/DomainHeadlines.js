import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import {Box, Button} from 'grommet';
import {More} from 'grommet-icons';
import {getArticlesByCategory, getTopHeadlines} from '../../api';
import Article from "./Article";
import {searchedArticles} from "../../../actions/appActions";

const DomainHeadlines = (props) => {
    const [articles, setArticles] = useState([]);
    const [chunk, setChunk] = useState(1);

    useEffect( () => {
        getArticlesByCategory(props.currentUser, 20, chunk, props.chosenDomain).then(data => {
            setArticles(data);
        });
    }, [props.chosenDomain]);

    let arr = [];
    if(props.searchedArticles.length === 0){
        (articles.length !== 0) ? articles.map( element => {
            arr.push(<Article data={element} />)
        }) : arr = null;
    }else{
        props.searchedArticles.map( element => {
            arr.push(<Article data={element} />)
        });
    }

    const handleShowMore = () => {
        getArticlesByCategory(props.currentUser, 20, chunk + 1, props.chosenDomain).then( (data) => {
            let art = articles;
            data.map(element => art.push(element));
            setArticles(art);
            setChunk(chunk + 1);
        })
    };

    let showMoreButton = ( (arr !== null) && (arr.length !== 0) && (props.searchedArticles.length === 0)) ?
                            <Button className={"show-more-button"} icon={<More />} label={"Show More"} onClick={handleShowMore}/> : null;

    return(
        <Box>
            {arr}
            <Box>
                {showMoreButton}
            </Box>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.app.currentUser,
        searchedArticles: state.app.searchedArticles
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        setSearchedArticles: (articles) => {dispatch(searchedArticles(articles))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DomainHeadlines);