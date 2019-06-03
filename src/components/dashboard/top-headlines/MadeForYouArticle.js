import React from 'react';
import {Box, Heading, Image} from 'grommet';
import '../../../style/top-headlines.scss';

const MadeForYouArticle = (props) => {
    const {title, urlToImage, url} = props.data;

    const handleTitleClick = () => {
        let win = window.open(url, '_blank');
        win.focus();
    };

    return(
        <Box id={"made-for-you-article-main-box"}>
            <Box id={"made-for-you-image-box"}>
                <Image id={"made-for-you-image"} fir={"cover"} src={urlToImage} />
            </Box>
            <Box id={"made-for-you-title-box"}>
                <Heading id={"made-for-you-it-to-article"} level={5} size={"medium"} onClick={handleTitleClick}> {title} </Heading>
            </Box>
        </Box>
    );
};

export default MadeForYouArticle;