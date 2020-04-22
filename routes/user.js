const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/user', userController.newUser);
router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getOneUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.removeUser);

module.exports = router;