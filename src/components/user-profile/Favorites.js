import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Box} from 'grommet';
import {getFavotiteArticles} from "../api";
import FavoriteArticle from "./FavoriteArticle";

const Favorites = (props) => {
    const [articles, setArticles] = useState([]);

    useEffect( () =>{
        getFavotiteArticles(props.currentUser).then( res => setArticles(res));

    }, []);

    let arr = [];
    (articles.length !== 0) ? articles.map( element => {
        arr.push(<FavoriteArticle img={element.urlToImage} title={element.title} description={element.description}/>)
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
    }
};

export default connect(mapStateToProps, null)(Favorites);