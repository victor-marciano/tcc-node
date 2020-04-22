const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    urlToImage: String
}, { collection: 'articles' });

const article = mongoose.model('Article', articleSchema);

module.exports = article;