const router = require('express').Router();
const userController = require('../controllers/userController');
const validation = require('../config/validation');

router.post('/user', validation.newUserValidation ,userController.newUser);
router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getOneUser);
router.put('/user/:id', validation.newUserValidation, userController.updateUser);
router.delete('/user/:id', userController.removeUser);

module.exports = router;