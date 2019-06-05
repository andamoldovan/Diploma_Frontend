import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Box} from 'grommet';
import {getFavotiteArticles} from "../api";
import FavoriteArticle from "./FavoriteArticle";
import {setUnfavoriteArticle} from "../../actions/appActions";

const Favorites = (props) => {
    const [articles, setArticles] = useState([]);

    useEffect( () =>{
        getFavotiteArticles(props.currentUser).then( res => setArticles(res));
        if(props.unfavoriteArticle === true) props.setUnfavoriteArticle(false);
    }, [props.unfavoriteArticle, props.currentUser]);

    let arr = [];
    (articles.length !== 0) ? articles.map( element => {
        arr.push(<FavoriteArticle id={element.id} img={element.urlToImage} title={element.title} description={element.description} content={element.content}/>)
    }) : arr = null;

    return(
        <Box>
            {arr}
        </Box>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.app.currentUser,
        unfavoriteArticle: state.app.unfavoriteArticle
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUnfavoriteArticle: (boolean) => {
            dispatch(setUnfavoriteArticle(boolean))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);