const { check } = require('express-validator');
const User = require('../models/User');

exports.newUserValidation = [
    check('password')
    .isLength({ min: 8, max: 20 }).withMessage('Sua senha deve conter entre 8 e 20 caracteres').bail(),    
    check('email')
    .isEmail().withMessage('Você deve fornecer um email válido').bail()
    .custom(email => {
        return User.findOne({ email: email }).then(user => {    
            if (user) {
                throw new Error("Este email ja está em uso");
            }
        });
    }).bail(),
    check('name')
    .isLength({ min: 3 }).withMessage('Muito curto para ser um nome').bail(),
];

exports.authValidation = [
    check('password')
    .exists().withMessage('A senha é obrigatória').bail(),    
    check('email')
    .exists().withMessage('O email é obrigatório')
];

exports.newDietValidation = [
    check('name').exists().withMessage("O nome da dieta é obrigatório"),
    check('start')
    .exists().withMessage("É necessário uma data de início para dieta").bail()
    .isDataURI().withMessage("É necessário ser uma data válida"),
    check('end')
    .exists().withMessage("É necessário uma data de término para dieta").bail()
    .isDataURI().withMessage("É necessário ser uma data válida")
]