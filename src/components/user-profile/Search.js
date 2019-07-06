import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Box, TextInput} from 'grommet';
import {Search} from 'grommet-icons';
import _ from 'lodash';
import {setsearchedFavoriteArticles} from '../../actions/appActions';
import {basicSearchOnFavorites} from "../api";
import Notification from "../Notification";

const ProfileSearch = (props) => {
   const [notification, setNotification] = useState(false);

    const searchQuery = _.debounce( (text) => {
      if(text === ''){
        props.setsearchedFavoriteArticles([]);
      }else{
          basicSearchOnFavorites(props.currentUser, text).then(res => {
              props.setsearchedFavoriteArticles(res);
              if(res.length === 0) setNotification(true);
          })
      }
    }, 500)

    return(
        <Box id={"profile-search-box"}>
            <Search color={'black'}/>
            <TextInput id={"search-input"} onChange={(event) => searchQuery(event.target.value)}/>
            {notification &&
                <Notification onClose={() => setNotification(false)} message={"No results returned for the search!"}/>}
        </Box>
    );
};


const mapStateToProps = (state) => {
    return{
        searchedFavoriteArticles: state.app.searchedFavoriteArticles,
        currentUser: state.app.currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setsearchedFavoriteArticles: (articles) => {dispatch(setsearchedFavoriteArticles(articles))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSearch);