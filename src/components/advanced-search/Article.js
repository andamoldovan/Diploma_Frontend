import React from 'react';
import {Box, Heading, Paragraph} from 'grommet';

const Article = (props) => {
    const { description, title, author, url} = props.data;

    let authorDef = (author === null) ? "No Author Available" : author;

    const redirectToArticle = () => {
        let win = window.open(url, '_blank');
        win.focus();
    };

  return(
      <Box id={"advanced-search-main-box"}>
          <Heading id={"advanced-search-heading"} level={4} margin={"xsmall"} onClick={redirectToArticle}> {title} </Heading>
          <Box>
              <Paragraph className={"advanced-search-paragraph"} margin={"small"} size={"small"}> {description} </Paragraph>
              <Paragraph id={"advanced-search-author"} className={"advanced-search-paragraph"} margin={{left: 'small'}} size={"small"}> Author: {authorDef} </Paragraph>
          </Box>
      </Box>
  );
};

export default Article;