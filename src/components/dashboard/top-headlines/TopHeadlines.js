import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Box, Button, Grommet} from "grommet";
import {More} from 'grommet-icons';
import {getTopHeadlines} from "../../api";
import Article from './Article';
import {searchedArticles} from "../../../actions/appActions";

const myTheme = {
    global: {
        colors: {
            control: {'light': '#9CC2BD'},
            text: {'light': 'black'}
        },
    }
};

const TopHeadlines = (props) => {
    const [articles, setArticles] = useState([]);
    const [chunk, setChunk] = useState(1);

    useEffect( () => {
        console.log("component did mount");
        let isSubscribed = true;
        props.setSearchedArticles([]);
        getTopHeadlines(props.currentUser, 20, chunk).then( (data) => {
            if(isSubscribed) setArticles(data);
            return null;
        });

        // return () => {
        //     console.log("Component did unmount");
        //     getTopHeadlines(props.currentUser, 20, 0).then( (data) => {
        //         isSubscribed = false;
        //     })
        // }
    }, []);

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

    const handelShowMore = () => {
        getTopHeadlines(props.currentUser, 20, chunk + 1).then( (data) => {
            let art = articles;
            data.map(element => art.push(element));
            setArticles(art);
            setChunk(chunk + 1);
        })
    };


    let showMoreButton = ( (arr !== null) && (arr.length !== 0) && (props.searchedArticles.length === 0)) ?
                                <Button className={"show-more-button"} icon={<More />} label={"Show More"}
                                              onClick={handelShowMore}/>
                                    : null;

    return(
       <Box className={"news-main-rendered-page"}>
           <Grommet theme={myTheme}>
               {arr}
               <Box>
                   {showMoreButton}
               </Box>
           </Grommet>
       </Box>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.app.currentUser,
        searchedArticles: state.app.searchedArticles
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        setSearchedArticles: (articles) => {dispatch(searchedArticles(articles))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopHeadlines);