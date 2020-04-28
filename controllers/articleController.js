const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);
const Article = require('../models/Articles');

exports.getPublicArticles = async (req, res) => {
    try {
        const response = await newsapi.v2.everything({q: 'fitness', language: 'pt', sortBy: 'relevancy', page: 1});
        let articles = response.articles;   
        res.send(articles);    
    } catch (error) {
        res.send(error);
    }
};

exports.getSystemArticles = async (req, res) => {
    try {
        const articles = await Article.find();   
        res.send(articles);    
    } catch (error) {
        res.send(error);
    }
};

exports.newArticle = async (req, res) => {
    try {
        await Article.create({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            urlToImage: req.body.imageUrl
        });       
        
        res.send({success: true, message: "Artigo inserido com sucesso!"});    
    } catch (error) {
        res.send(error);
    }
};

exports.removeArticle = async (req, res) => {
    try {
        const result = await Article.deleteOne({_id: req.params.id});       
        if (result.deletedCount === 0) {
            throw new Error("Erro ao remover artigo!");
        }      
        
        res.send({success: true, message: "Artigo removido com sucesso!"});    
    } catch (error) {
        res.send(error);
    }
};
