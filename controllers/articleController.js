const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);

exports.getPublicArticles = async (req, res) => {
    try {
        const response = await newsapi.v2.everything({q: 'fitness', language: 'pt', sortBy: 'relevancy', page: 1});
        let articles = response.articles;
        res.send(articles);    
    } catch (error) {
        res.send(error);
    }
};
