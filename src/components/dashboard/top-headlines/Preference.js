import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {Box, Button, Heading} from "grommet";
import {CaretNext, CaretPrevious} from 'grommet-icons';
import '../../../style/top-headlines.scss';
import {getArticlesByCategory} from "../../api";
import MadeForYouArticle from './MadeForYouArticle';

const Preference = (props) => {
    const [articles, setArticles] = useState([]);
    const [number, setNumber] = useState(0);

    useEffect( () => {
        let isSubscribed = true;
        getArticlesByCategory(props.currentUser, 20, 1, props.domain).then(data => {
            if(isSubscribed) setArticles(data);
        });

        // return () => {
        //     isSubscribed = false;
        // }
    }, [props.domain, props.currentUser]);

    let arr = [];
    (articles.length !== 0) ? articles.map( element => {
        arr.push(<MadeForYouArticle data={element} />);
        return null;
    }) : arr = null;
    let element = [];
    if(arr !== null) {
        element.push(arr[number]); element.push(arr[number + 1]); element.push(arr[number + 2]);
    } else element = [];

    const handleNext = () => {
        if(number < 16){
            element = [];
            element.push(arr[number + 1]);
            element.push(arr[number + 2]);
            element.push(arr[number + 3]);
            setNumber(number + 1);
        }
    };

    const handlePrevious = () => {
        if(number >= 1){
            element = [];
            element = arr[number - 1];
            element = arr[number];
            element = arr[number + 1];
            setNumber(number - 1);
        }
    };

    return(
        <Box id={"main-preference-box"}>
            <Box id={"title-preference-box"}>
                <Heading level={3}> {props.domain.toUpperCase()} </Heading>
            </Box>
            <Box id={"made-for-you-previous-button"}>
                <Button className={'button-previous-next'} icon={<CaretPrevious />} onClick={handlePrevious}/>
            </Box>
            <Box id={"made-for-you-article-elements"} direction={"row"}>
                {element}
            </Box>
            <Box id={"made-for-you-next-button"}>
                <Button className={'button-previous-next'} icon={<CaretNext />} onClick={handleNext}/>
            </Box>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.app.currentUser,
    }
};

export default connect(mapStateToProps, null)(Preference);
