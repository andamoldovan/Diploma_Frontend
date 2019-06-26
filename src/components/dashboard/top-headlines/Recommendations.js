import React, {useState, useEffect} from 'react';
import {Box, Button, Heading} from 'grommet'
import {CaretPrevious, CaretNext} from "grommet-icons";
import RecommendationArticle from './RecommendationArticle';
import {getArticlePredictionsForUser} from "../../api";

const Recommendations = (props) => {
    const [articles, setArticles] = useState([]);
    const [number, setNumber] = useState(0);

    useEffect(() => {
        getArticlePredictionsForUser(props.user).then(res => setArticles(res));
    }, []);

    let arr = [];
    if(articles.length !== 0){
        articles.map(element => {
            arr.push(<RecommendationArticle data={element} />)
        })
    }

    let displayArticles = [];
    if(arr.length !== 0 && displayArticles.length === 0){
        if(arr.length === 1){
            displayArticles.push(arr[0]);
        }else if(arr.length === 2){
            displayArticles.push(arr[0]);
            displayArticles.push(arr[1]);
        }else{
            displayArticles.push(arr[0]);
            displayArticles.push(arr[1]);
            displayArticles.push(arr[2]);
        }
    }

    const handlePrevious = () => {

    };

    const handleNext = () => {
        if((number ) < articles.length){
            displayArticles = [];
            displayArticles.push(number + 1);
            displayArticles.push(number + 2);
            displayArticles.push(number + 3);
        }
    };

    return(
        <Box id={"predictions-box"}>
            <Heading level={1} style={{'marginLeft': '23%'}}> Article Recommendations</Heading>
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