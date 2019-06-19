import {
    BUTTON_COUNT,
    LOGGED_IN_USER,
    SEARCHED_ARTICLES,
    CREATE_NEW_USER,
    DOMAIN_PAGE_SELECTED,
    OPENED_ARTICLE_CONTENT,
    UNFAVORITE_ARTICLE,
    ADVANCED_SEARCH_FILTER,
    SOLR_SEARCH_RESULTS,
    SOLR_RESULT_PAGE,
    IS_FILTERED_SEARCH,
    FILTER_BY_DOMAIN,
    OPEN_EMAIL_SCHEDULER
} from "../actions/types";

const initialState = {
    items: 0,
    currentUser: {},
    registerNewUser: {},
    searchedArticles: [],
    domainPage: 'headlines',
    openArticleContent: '',
    unfavoriteArticle: false,
    advancedSearchFilter: [],
    solrSearchResults: [],
    solrResultPage: 1,
    isFilteredSearch: false,
    filterByDomain: null,
    openEmailScheduler: false,
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
        case SOLR_SEARCH_RESULTS :
            return {
                ...state, solrSearchResults: action.payload
            };
        case SOLR_RESULT_PAGE :
            return {
                ...state, solrResultPage: action.payload
            };
        case IS_FILTERED_SEARCH :
            return {
                ...state, isFilteredSearch: action.payload
            };
        case FILTER_BY_DOMAIN :
            return {
                ...state, filterByDomain: action.payload
            };
        case OPEN_EMAIL_SCHEDULER :
            return {
                ...state, openEmailScheduler: action.payload
            };
        default: return state;
    }
}

