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
    if(props.searchedFavoriteArticles.length === 0){
        (articles.length !== 0) ? articles.map( element => {
            arr.push(<FavoriteArticle id={element.id} img={element.urlToImage} title={element.title} description={element.description} content={element.content}/>)
        }) : arr = null;
    }else {
            props.searchedFavoriteArticles.map( element => {
                arr.push(<FavoriteArticle id={element.id} img={element.urlToImage} title={element.title} description={element.description} content={element.content}/>)
            })
    }


    console.log("FAVORITES SEARCH")
    console.log(props.searchedFavoriteArticles.length);
    console.log("FAVORITE ARTICLES")
    console.log(articles);
    console.log("ARR");
    console.log(arr)

    return(
        <Box>
            {arr}
        </Box>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.app.currentUser,
        unfavoriteArticle: state.app.unfavoriteArticle,
        searchedFavoriteArticles: state.app.searchedFavoriteArticles,
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