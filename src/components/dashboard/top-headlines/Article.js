import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Box, Heading, Image, Paragraph, Button} from 'grommet';
import {Favorite, Star} from 'grommet-icons';
import _ from 'lodash';
import '../../../style/top-headlines.scss';
import {loggedInUser, setArticleContent} from "../../../actions/appActions";
import {updateFavoriteArticles, updateArticleRatingsForUser} from "../../api";
import noImage from '../../../images/2.jpg';

const Article = (props) => {

    const {name} = props.data.articleSourceDTO;
    const {id, content, description, publishedAt, title, url, urlToImage} = props.data;
    const [favoriteStatus, setFavoriteStatus] = useState({});
    const [rating, setRating] = useState([]);
    const [validImage, setValidImage] = useState(urlToImage);
    const formatedDate = publishedAt.substring(0, 10) +  " : " + publishedAt.substring(11, 19);

    useEffect( () => {
        const index = _.findIndex(props.currentUser.favoriteArticles, (item) => {return item === id});
        if(index > -1) setFavoriteStatus({'fill' : '#f44259'});
        else setFavoriteStatus({'fill' : '#666666'});

        let rating = props.currentUser.articleRatings[id];
        if(rating !== undefined){
            let ratings = [{}];
            const yellowFill = {'fill': '#f1f441'};
            const blackFill = {'fill': '#666666'};
            for(let i = 1; i <= 5; i++){
                (i <= rating) ? ratings.push(yellowFill) : ratings.push(blackFill);
            }
            setRating(ratings);
        }

    }, []);

    useEffect(() => {
        setValidImage(urlToImage);
    },  [urlToImage]);

    const redirectToContent = () => {
        let articleContent = {
            title: title,
            img: urlToImage,
            content: content
        };
        const currentUser = props.currentUser;
        currentUser.readArticles = props.currentUser.readArticles + 1;
        props.setLoggedInUser(currentUser);
        props.setOpenArticleContent(articleContent);
        let win = window.open("http://localhost:3000/main-page/content", '_blank');
        win.focus();
    };

    const handleGoToOriginalPage = () => {
        let win = window.open(url, '_blank');
        win.focus();
    };

    const handleFavoriteClick = () => {
        let favorites = props.currentUser.favoriteArticles;
        let newFavorites = [];
        let check = false;
        if(favorites.length === 0) {
            newFavorites.push(id);
        }
        else {
            favorites.map(item => {
                if (item === id) {
                    if (favoriteStatus.fill === '#666666') newFavorites.push(id);
                    check = true;
                } else {
                    newFavorites.push(item);
                }
            });
            if(check === false) newFavorites.push(id);
        }
        let user = props.currentUser;
        user.favoriteArticles = newFavorites;
        props.setLoggedInUser(user);
        (favoriteStatus.fill ===  '#f44259' ) ? setFavoriteStatus({'fill' : '#666666'}) : setFavoriteStatus({'fill' : '#f44259'});
        updateFavoriteArticles(user).then(res => console.log(res));
    } ;

    const handleRatingClick = (element) => {
        console.log(element);
        let currentUser = props.currentUser;
        let ratings = currentUser.articleRatings;
        let rating = ratings[id];
        if(rating === undefined){
            let newRating = [{}];
            const yellowFill = {'fill': '#f1f441'};
            const blackFill = {'fill': '#666666'};
            for(let i = 1; i <= 5; i++){
                (i <= element) ? newRating.push(yellowFill) : newRating.push(blackFill);
            }
            setRating(newRating);
            ratings[id]= element;
            currentUser.articleRatings = ratings;
            props.setLoggedInUser(currentUser);
            updateArticleRatingsForUser(currentUser).then(res => console.log(res));
        }
    }

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
                    <Button id={"favorite-article"} icon={<Favorite id={"star-icon"} style={favoriteStatus}/>} onClick={handleFavoriteClick} />
                </Box>
                <Box id={"image-main-box"} direction={"row"} >
                    <Box id={"image-box"} height={"medium"} width={"large"}>
                        <img onError={() => setValidImage(noImage)} id={"article-image"} src={validImage} alt={"No Image"}/>
                    </Box>
                    <Box id={"description-main-box"}>
                        <Paragraph margin={"medium"}>
                            {description}
                        </Paragraph>
                        <Box id={"rating-box"} direction={'row'}>
                            <Heading id={'rating-system-heading'} margin={{left: 'medium'}} style={{'fontStyle': 'italic'}} level={5} > Rate the article: </Heading>
                            <Button icon={<Star style={rating[1]}/>} onClick={() => handleRatingClick(1)} />
                            <Button icon={<Star style={rating[2]}/>} onClick={() => handleRatingClick(2)} />
                            <Button icon={<Star style={rating[3]}/>} onClick={() => handleRatingClick(3)} />
                            <Button icon={<Star style={rating[4]}/>} onClick={() => handleRatingClick(4)} />
                            <Button icon={<Star style={rating[5]}/>} onClick={() => handleRatingClick(5)} />
                        </Box>
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

const mapStateToProps = (state) => {
    return{
        currentUser: state.app.currentUser,
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        setLoggedInUser : (user) => { dispatch(loggedInUser(user)) },
        setOpenArticleContent: (content) => {dispatch(setArticleContent(content))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);