import api from "../http";

class BlogService {
    async showAllArticles(page, filters = '') {
        return api.get(`/article?page=${page}&orderBy=${filters?.order || ''}&filterBy=${filters?.filter || ''}`);
    }

    async showArticlestoModerate(page) {
        return api.get('/articles-to-moderate?page=' + page);
    }

    async publicArticle(id) {
        return api.post('/article-approve', {id});
    }

    async declineArticle(id) {
        return api.post('/decline-article', {id});
    }

    async create(title, text, avatar) {
        return api.post("/create", {title, text, avatar})
    }

    async showArticleById(articleId) {
        return api.get(`/article/${articleId}`)
    }

    async delete(articleId) {           
       return api.post("/delete", {articleId}) 
    }

    async change(articleId, title, text, avatar) {
        return api.post(`/change/${articleId}`, {title, text, avatar})
    }

    async getInfoBeforeChange(articleId) {
        return api.get(`/change/${articleId}`);
    }

    async authorization(email, password) {
        return api.post("/authorization", {email, password});
    }

    async registration(email, passowrd) {
        return api.post('/registration', {email, password: passowrd});
    }
    
    async refresh() {
        return api.get("/refresh");
    }
}

export default new BlogService();