const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);
const Article = require('../models/Articles');

exports.getPublicArticles = async (req, res) => {
    try {
        const response = await newsapi.v2.everything({q: 'fitness', language: 'pt', sortBy: 'relevancy', page: 1});
        let articles = response.articles;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(articles);    
    } catch (error) {
        res.send(error);
    }
};

exports.getSystemArticles = async (req, res) => {
    try {
        const articles = await Article.find();        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(articles);    
    } catch (error) {
        res.send(error);
    }
};
