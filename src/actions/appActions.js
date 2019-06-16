import {
    BUTTON_COUNT,
    LOGGED_IN_USER,
    SEARCHED_ARTICLES,
    CREATE_NEW_USER,
    DOMAIN_PAGE_SELECTED,
    OPENED_ARTICLE_CONTENT,
    UNFAVORITE_ARTICLE,
    ADVANCED_SEARCH_FILTER,
    SOLR_SEARCH_RESULTS} from "./types";

export const buttonCount = (payload) => {
    return {
        type: BUTTON_COUNT,
        payload: payload
    }
};

export const loggedInUser = (payload) => {
    return {
        type: LOGGED_IN_USER,
        payload: payload
    }
};

export const searchedArticles = (payload) => {
    return {
        type: SEARCHED_ARTICLES,
        payload: payload
    }
};

export const registerNewUser = (payload) => {
    return {
        type: CREATE_NEW_USER,
        payload: payload
    }
};

export const setDomainPage = (payload) => {
    return {
        type: DOMAIN_PAGE_SELECTED,
        payload: payload
    }
};

export const setArticleContent = (payload) => {
    return {
        type: OPENED_ARTICLE_CONTENT,
        payload: payload
    }
};

export const setUnfavoriteArticle = (payload) => {
    return {
        type: UNFAVORITE_ARTICLE,
        payload: payload
    }
};

export const setAdvancedSearchFilter = (payload) => {
    return {
        type: ADVANCED_SEARCH_FILTER,
        payload: payload
    }
};

export const setSolrSearchResults = (payload) => {
    return {
        type: SOLR_SEARCH_RESULTS,
        payload: payload
    }
};