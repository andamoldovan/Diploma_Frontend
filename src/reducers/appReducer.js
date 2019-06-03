import {
    BUTTON_COUNT,
    LOGGED_IN_USER,
    SEARCHED_ARTICLES,
    CREATE_NEW_USER,
    DOMAIN_PAGE_SELECTED,
    OPENED_ARTICLE_CONTENT} from "../actions/types";

const initialState = {
    items: 0,
    currentUser: {},
    registerNewUser: {},
    searchedArticles: [],
    domainPage: 'headlines',
    openArticleContent: ''
};

export default function(state = initialState, action) {
    switch(action.type){
        case BUTTON_COUNT :
            return {
                ...state, items: action.payload
            };
        case LOGGED_IN_USER :
            return {
                ...state, currentUser: action.payload
            };
        case SEARCHED_ARTICLES :
            return {
                ...state, searchedArticles: action.payload
            };
        case CREATE_NEW_USER :
            return {
                ...state, registerNewUser: action.payload
            };
        case DOMAIN_PAGE_SELECTED :
            return {
                ...state, domainPage: action.payload
            };
        case OPENED_ARTICLE_CONTENT :
            return {
                ...state, openArticleContent: action.payload
            };
        default: return state;
    }
}

