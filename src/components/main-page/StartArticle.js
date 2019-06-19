import React, {useState} from 'react';
import {Box, Heading} from 'grommet';
import noImage from '../../images/2.jpg';

const StartArticle = (props) => {
    const {url, image, title} = props;
    const [validImage, setValidImage] = useState(image);

    const handleImageClick = () => {
        let win = window.open(url, '_blank');
        win.focus();
    };

    return(
        <Box id={"start-dashboard-article"} onClick={handleImageClick}>
            <Heading id={"start-dashboard-heading"} level={4} margin={{top: '20%'}} alignSelf={'start'}> {title} </Heading>
            <img onError={() => setValidImage(noImage)} id={"start-article-image"} src={validImage} />
        </Box>
    );
};

export default StartArticle;