const router = require('express').Router();
const userController = require('../controllers/userController');
const validation = require('../config/validation');
const multer  = require('multer');
// const upload = multer({ dest: '../uploads/profile' }); // not implemented yet
const upload = multer();

// router.post('/user', [upload.single('avatar'), validation.newUserValidation] , userController.newUser);
// code above works only if files have been implemented
router.post('/user', [upload.none(), validation.newUserValidation] , userController.newUser);
router.post('/user/auth', validation.authValidation , userController.authUser);
router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getOneUser);
router.put('/user/:id', validation.newUserValidation, userController.updateUser);
router.delete('/user/:id', userController.removeUser);
router.get('/user/:id/all', userController.getOneUserWithAllData);

module.exports = router;