const router = require('express').Router();
const articleController = require('../controllers/articleController');

router.get('/articles/public', articleController.getPublicArticles);

module.exports = router;