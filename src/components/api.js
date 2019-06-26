export function login(email, password){
    return fetch("http://localhost:8080/users/login?email=" + email + "&password=" + password, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
}

export function logout(currentUser){
    return fetch("http://localhost:8080/users/logout", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( currentUser)
    }).then(res => res.json())
}


export function updateReadArticles(currentUser){
    return fetch("http://localhost:8080/users/update/readArticles", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( currentUser)
    }).then(res => res.json())
}

export function updateFavoriteArticles(currentUser){
    return fetch("http://localhost:8080/users/update/favoriteArticle", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( currentUser)
    }).then(res => res.json())
}

export function updateEmailSchedule(currentUser){
    return fetch("http://localhost:8080/users/update/emailScheduler", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    }).then(res => res.json())
}

export function registerUser(currentUser){
    return fetch("http://localhost:8080/users/saveUser", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( currentUser)
    }).then(res => res.json())
}

export function getTopHeadlines(currentUser, chunkSize, chunk){
    return fetch("http://localhost:8080/top-headlines?chunkSize=" + chunkSize + "&chunkNumber=" + chunk, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    }).then(res => res.json())
}

export function getArticlesByCategory(currentUser, chunkSize, chunk, category){
    return fetch("http://localhost:8080/domain-news?domain=" + category +"&chunkSize=" + chunkSize + "&chunkNumber=" + chunk, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    }).then(res => res.json())
}

export function basicSearch(domain, word){
    return fetch("http://localhost:8080/search/basic-search?domain=" + domain +"&field=" + word, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
}

export function solrGetAllArticles(currentUser, chunk){
    return fetch("http://localhost:8080/solr?chunk=" + chunk + "&chunkSize=5", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .catch( ex => console.log("Exception " + ex));
}

export function solrFullTextSearch(text){
    return fetch("http://localhost:8080/solr/fullTextSearch?text=" + text, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
}

export function solrSarchByAttribute(text, attribute){
    return fetch("http://localhost:8080/solr/attributeSearch?text=" + text + "&attr=" + attribute, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json());
}

export function getFavotiteArticles(currentUser){
    return fetch("http://localhost:8080/favorites/getArticle", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( currentUser)
    }).then(res => res.json())
}

export function getStartDashboardArticles(){
    return fetch("http://localhost:8080/domain-news/getStartDashboard", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

export function updateArticleRatingsForUser(currentUser){
    return fetch("http://localhost:8080/users/update/articleRatings", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( currentUser)
    }).then(res => res.json())
}

export function getArticlePredictionsForUser(currentUser){
    return fetch("http://localhost:8080/users/recommendations/getRecommendation", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( currentUser)
    }).then(res => res.json())
}