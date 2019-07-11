import React, {useState, useEffect} from 'react';
import {Box, Heading, Grommet, Button, Image} from 'grommet';
import noImage from "../../../images/2.jpg";

const myTheme = {
    global: {
        colors: {
            control: {'light': '#9CC2BD'},
            text: {'light': 'black'}
        },
    },
    button: {
        padding: {
            horizontal: '12px'
        }
    }
};

const RecommendationArticle = (props) => {
    const {name} = props.data.articleSourceDTO;
    const {id, content, description, publishedAt, title, url, urlToImage, author} = props.data;

    const [validImage, setValidImage] = useState(urlToImage);
    const [validAuthor, setValidAuthor] = useState(author);

    useEffect( () => {
        if(author === null || author === undefined || author === ''){
            setValidAuthor('No Author');
        }
        setValidImage(urlToImage);
    }, [urlToImage]);

    const handleRedirect = () => {
        let win = window.open(url, '_blank');
        win.focus();
    };

    return(
        <Box id={"main-recommendation-box"} style={{'width': '25%', 'marginRight': '60px'}}>
            <Grommet theme={myTheme}>
                <Box id={"prediction-image-box"}>
                    <img onError={() => setValidImage(noImage)} id={"prediction-article-image"} src={validImage} alt={"No Image"}/>
                </Box>
                <Box margin={{bottom: '0'}}>
                    <Heading level={4} alignSelg={'center'} margin={{top: '0', bottom: '0'}} > {title} </Heading>
                </Box>
                <Box direction={'row'} margin={{top: 'small'}}>
                    <Heading level={4} alignSelg={'center'} style={{'fontStyle': 'italic'}}> Author:  </Heading>
                    <Heading level={4} alignSelg={'center'} truncate={true}> {validAuthor} </Heading>
                </Box>
                <Box>
                    <Button id={'prediction-button'} label={'Visit the original article'}  onClick={handleRedirect}/>
                </Box>
            </Grommet>
        </Box>
    );
};

export default RecommendationArticle;