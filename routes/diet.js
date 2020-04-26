const router = require('express').Router();
const dietController = require('../controllers/dietController');

router.get('/diet', dietController.getDiet);
router.post('/diet', dietController.newDiet);
router.delete('/diet/:id', dietController.removeDiet);

module.exports = router;