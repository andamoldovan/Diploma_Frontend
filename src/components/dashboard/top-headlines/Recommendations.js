import React, {useState, useEffect} from 'react';
import {Box, Button, Heading} from 'grommet'
import {CaretPrevious, CaretNext} from "grommet-icons";
import RecommendationArticle from './RecommendationArticle';
import {getArticlePredictionsForUser} from "../../api";

let displayArticles = [];
const Recommendations = (props) => {
    const [articles, setArticles] = useState([]);
    const [number, setNumber] = useState(-1);
    const [render, setRender] = useState([]);

    useEffect(() => {
        getArticlePredictionsForUser(props.user).then(res => setArticles(res));
    }, []);

    let arr = [];
    if(articles.length !== 0){
        console.log("PREDICTIONS");
        console.log(articles);
        articles.map(element => {
            arr.push(<RecommendationArticle data={element} />)
        })
    }


    if(arr.length !== 0 && number === -1){
        if(arr.length === 1){
            displayArticles.push(null);
            displayArticles.push(arr[0]);
            displayArticles.push(null);
        }else if(arr.length === 2){
            displayArticles.push(arr[0]);
            displayArticles.push(arr[1]);
            displayArticles.push(null);
        }else{
            displayArticles.push(arr[0]);
            displayArticles.push(arr[1]);
            displayArticles.push(arr[2]);
        }
        setNumber(0);
    }

    const handlePrevious = () => {
        if (number >= 1){
            displayArticles = [];
            displayArticles.push(arr[number - 1]);
            displayArticles.push(arr[number]);
            displayArticles.push(arr[number + 1]);
            setNumber(number - 1);
        }
    };

    const handleNext = () => {
        console.log("NUMBER");
        console.log(number);
        console.log(arr.length);
        console.log(number < arr.length - 2);
        if((number ) < arr.length - 3){
            displayArticles = [];
            displayArticles.push(arr[number + 1]);
            displayArticles.push(arr[number + 2]);
            displayArticles.push(arr[number + 3]);
            setNumber(number + 1);
        }
    };

    return(
        <Box id={"predictions-box"}>
            <Box style={{'marginLeft': '23%', 'marginRight': '42%'}}>
            <Heading level={1}  className={'main-page-titles-class'}> Article Recommendations</Heading>
            </Box>
            <Box direction={'row'}>
                {displayArticles}
            </Box>
            <Box id={'prediction-caret-buttons'} direction={'row'}>
                <Button icon={<CaretPrevious />} onClick={handlePrevious}/>
                <Button icon={<CaretNext />} onClick={handleNext}/>
            </Box>
        </Box>
    );
};

export default Recommendations;