const router = require('express').Router();
const foodController = require('../controllers/foodController');

router.get('/food', foodController.getFood);

module.exports = router;