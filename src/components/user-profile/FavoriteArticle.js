import React from 'react';
import {Box, Image, Heading, Paragraph} from 'grommet';

const FavoriteArticle = (props) => {

    const {img, description, title} = props;

  return(
      <Box id={"favorite-main-box"}>
          <Heading level={5}> {title} </Heading>
          <Box id={"favorite-image-box"}>
              <Image src={img} />
          </Box>
          <Box id={"favorite-description-box"}>
              <Paragraph margin={"medium"}> {description} </Paragraph>
          </Box>
      </Box>
  );
};

export default FavoriteArticle;