const router = require('express').Router();
const dietController = require('../controllers/dietController');

router.get('/diet', dietController.getDiet);
router.post('/diet', dietController.newDiet);
router.delete('/diet/:id', dietController.removeDiet);
router.post('/diet/:user_id', dietController.systemNewDiet);

module.exports = router;