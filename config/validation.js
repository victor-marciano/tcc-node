const { check } = require('express-validator');

exports.newUserValidation = [
    check('password')
    .isLength({ min: 8, max: 20 }).withMessage('Sua senha deve conter entre 8 e 20 caracteres').bail(),
    // .matches(/\d/).withMessage('Sua senha deve conter ao menos um número')
    check('email')
    .isEmail().withMessage('Você deve fornecer um email válido').bail(),
    check('name')
    .isLength({ min: 3 }).withMessage('Muito curto para ser um nome').bail(),
];

exports.authValidation = [
    check('password')
    .exists().withMessage('A senha é obrigatória').bail(),    
    check('email')
    .exists().withMessage('O email é obrigatório')
];