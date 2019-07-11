import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Box, Paragraph, Heading, Image} from 'grommet';
import '../../../style/top-headlines.scss';

const ArticleContent = (props) => {

    useEffect(() => {
        if(props.currentUser === null) window.location = "http://localhost:3000";
    }, []);

    const {title, img, content} = props.openArticleContent;

    let arr = content.split('\n');
    let paragraphs = [];
    arr.map(element => {
        paragraphs.push(<Paragraph className={"paragraph-content"} alignSelf={"stretch"}> {element} </Paragraph>);
        return null;
    });

    return(
        <Box>
            <Box>
                <Heading alignSelf={"center"} level={1} size={"medium"}> {title} </Heading>
            </Box>
            <Box>
                <Image id={"article-image-content"} fit={"contain"} src={img}/>
            </Box>
            <Box id={"paragraph-box"}>
                {paragraphs}
            </Box>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        openArticleContent: state.app.openArticleContent,
        currentUser: state.app.currentUser
    }
};

export default connect(mapStateToProps, null)(ArticleContent);