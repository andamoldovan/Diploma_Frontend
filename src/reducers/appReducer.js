import {
    BUTTON_COUNT,
    LOGGED_IN_USER,
    SEARCHED_ARTICLES,
    CREATE_NEW_USER,
    DOMAIN_PAGE_SELECTED,
    OPENED_ARTICLE_CONTENT,
    UNFAVORITE_ARTICLE,
    ADVANCED_SEARCH_FILTER} from "../actions/types";

const initialState = {
    items: 0,
    currentUser: {},
    registerNewUser: {},
    searchedArticles: [],
    domainPage: 'headlines',
    openArticleContent: '',
    unfavoriteArticle: false,
    advancedSearchFilter: []
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
        case UNFAVORITE_ARTICLE :
            return {
                ...state, unfavoriteArticle: action.payload
            };
        case ADVANCED_SEARCH_FILTER :
            return {
                ...state, advancedSearchFilter: action.payload
            };
        default: return state;
    }
}

