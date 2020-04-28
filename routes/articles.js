const router = require('express').Router();
const articleController = require('../controllers/articleController');

router.get('/articles/public', articleController.getPublicArticles);
router.get('/articles', articleController.getSystemArticles);
router.post('/articles', articleController.newArticle);
router.delete('/articles/:id', articleController.removeArticle);

module.exports = router;