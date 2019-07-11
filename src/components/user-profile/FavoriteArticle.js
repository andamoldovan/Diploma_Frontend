import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Box, Image, Heading, Paragraph, Button} from 'grommet';
import {Favorite} from 'grommet-icons';
import {loggedInUser, setArticleContent, setUnfavoriteArticle} from "../../actions/appActions";
import {updateFavoriteArticles} from "../api";

const FavoriteArticle = (props) => {

    const {id, img, description, content, title} = props;
    const [favoriteStatus, setFavoriteStatus] = useState({'fill' : '#f44259'});

    const redirectToContent = () => {
        let articleContent = {
            title: title,
            img: img,
            content: content
        };
        const currentUser = props.currentUser;
        currentUser.readArticles = props.currentUser.readArticles + 1;
        props.setLoggedInUser(currentUser);
        props.setOpenArticleContent(articleContent);
        let win = window.open("http://localhost:3000/main-page/content", '_blank');
        win.focus();
    };

    const handleFavoriteClick = () => {
        let favorites = props.currentUser.favoriteArticles;
        let newFavorites = [];
        let check = false;
        if(favorites.length === 0) newFavorites.push(id);
        else {
            favorites.map(item => {
                console.log(item);
                if (item === id) {
                    console.log(1);
                    if (favoriteStatus.fill === '#F8F8F8') {
                        console.log(2);
                        newFavorites.push(id);
                    }
                    check = true;
                } else {
                    newFavorites.push(item);
                    console.log(3);
                }
            });
            if(check === false) newFavorites.push(id);
            else props.setUnfavoriteArticle(true);
        }
        let user = props.currentUser;
        user.favoriteArticles = newFavorites;
        props.setLoggedInUser(user);
        updateFavoriteArticles(user).then(res => console.log(res));
    };

  return(
      <Box id={"favorite-main-box"}>
          <Heading id={"favorite-title"} level={5} margin={"xsmall"} alignSelf={"stretch"} onClick={redirectToContent}> {title} </Heading>
          <Box id={"favorite-image-box"}>
              <Image  id={"favorite-image"} src={img} />
              <Button id={"favorite-article-star"} icon={<Favorite id={"star-icon"} style={favoriteStatus}/>} onClick={handleFavoriteClick} />
          </Box>
          <Box id={"favorite-description-box"}>
              <Paragraph id={"favorite-paragraph"} margin={"small"} size={"small"}> {description} </Paragraph>
          </Box>
      </Box>
  );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.app.currentUser,
        unfavoriteArticle: state.app.unfavoriteArticle
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        setLoggedInUser : (user) => { dispatch(loggedInUser(user)) },
        setOpenArticleContent: (content) => {dispatch(setArticleContent(content))},
        setUnfavoriteArticle: (boolean) => {dispatch(setUnfavoriteArticle(boolean))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteArticle);