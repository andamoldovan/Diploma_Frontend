import React from 'react';
import {connect} from 'react-redux';
import {Box, Heading, Image, Paragraph} from 'grommet';
import '../../../style/top-headlines.scss';
import {setArticleContent} from "../../../actions/appActions";

const Article = (props) => {

    const {name} = props.data.articleSourceDTO;
    const {content, description, publishedAt, title, url, urlToImage} = props.data;

    const formatedDate = publishedAt.substring(0, 10) +  " : " + publishedAt.substring(11, 19);

    const redirectToContent = () => {
        let articleContent = {
            title: title,
            img: urlToImage,
            content: content
        };
        props.setOpenArticleContent(articleContent);
        let win = window.open("http://localhost:3000/main-page/content", '_blank');
        win.focus();
    };

    const handleGoToOriginalPage = () => {
        let win = window.open(url, '_blank');
        win.focus();
    };

    return(
        <Box id={"main-box"}>
        <Box id={"title-box"}>
            <Box id={"main-title-box"}>
                <Heading id={"title-heading"} alignSelf={"start"} level={2} size={"medium"} onClick={redirectToContent}>
                    {title}
                </Heading>
                <Box id={"socondary-title-box"} direction={"row"}>
                    <Heading id={"published-date"} alignSelf={"start"} level={6} size={"medium"}>
                        Publication Date: {formatedDate}
                    </Heading>
                    <Heading id={"publication-name"} alignSelf={"start"} level={6} size={"medium"}>
                        Publication Name: {name}
                    </Heading>
                </Box>
                <Box id={"image-main-box"} direction={"row"} >
                    <Box id={"image-box"} height={"medium"} width={"large"}>
                        <Image id={"article-image"} fit={"cover"} src={urlToImage}/>
                    </Box>
                    <Box id={"description-main-box"}>
                        <Paragraph margin={"medium"}>
                            {description}
                        </Paragraph>
                    </Box>
                </Box>
                <Box>
                    <Heading id={"publication-original-article"} target={"_blank"} alignSelf={"start"} level={6} size={"medium"} onClick={handleGoToOriginalPage}>
                        Visit the original page
                    </Heading>
                </Box>
            </Box>

        </Box>
        </Box>
    );
};

const mapDispatchToProps = (dispatch) => {
    return{
        setOpenArticleContent: (content) => {dispatch(setArticleContent(content))}
    }
};

export default connect(null, mapDispatchToProps)(Article);