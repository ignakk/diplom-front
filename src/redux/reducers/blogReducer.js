const initialState = {
    articles: {},
    page: 1,
    currentArticle: {
        article: {},
        isLoaded: false
    },
    isLoaded: false
}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ALL_ARTICLES":
            return {
                ...state,
                articles: action.payload,
                isLoaded: true
            }

        case "SET_ARTICLE_LOADED": {
            return {
                ...state,
                isLoaded: action.payload
            }
        }
            
        
        case "SET_ARTICLE_BY_ID":
            const newObjOfArticle = {
                article: action.payload,
                isLoaded: true
            };
            return {
                ...state,
                currentArticle: newObjOfArticle,
                isLoaded: false
            }

        case "CLEAR_ARTICLE_BY_ID":
            return {
                ...state,
                currentArticle: {article: action.payload, isLoaded: false}
            }

        case "DELETE_ARTICLE":
            const articlesToDelete = state.articles;
            const newArticlesToDelete = JSON.parse(JSON.stringify(articlesToDelete))
            const articlesWithoutDeleted = newArticlesToDelete.filter(obj => obj._id !== action.payload);
            return {
                ...state,
                articles: articlesWithoutDeleted
            }

        case "SET_ARTICLE_AFTER_CHANGE":
            return {
                ...state,
                currentArticle: {article: action.payload, isLoaded: false}
            }

        case "CREATE_ARTICLE":
            return {
                ...state,
                articles: [...state.articles, action.payload.blog],
            }
            
        case "PAGINATION":
            return {
                ...state,
                page: action.payload === "plus" ? state.page + 1 : action.payload !== "plus" && state.page !== 1 ? state.page - 1 : 1,
                isLoaded: false
            }
    
        default: return state
    }
}

export default blogReducer;