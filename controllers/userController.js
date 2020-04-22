const User = require('../models/User');
const argon2 = require('argon2');
const { validationResult } = require('express-validator');

exports.newUser = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(422).send({ errors: validationErrors.array() });
    } 

    try {        
        const hashedPassword = await argon2.hash(req.body.password);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword       
        });        
        res.send({success: true, message: "Usuário cadastrado com sucesso!"});        
    } catch (error) {
        res.send({success: false, message: "Erro ao cadastrar usuário!", error: error});    
    }   
}

exports.getUsers = async (req, res) => { 
    try {        
        const users = await User.find();
        res.send({success: true, users: users});        
    } catch (error) {
        res.send({success: false, message: "Erro ao cadastrar usuário!", error: error});    
    }   
}

exports.getOneUser = async (req, res) => { 
    try {        
        const user = await User.findOne({_id: req.params.id});
        if (!user) {
            throw new Error("Nenhum usuário com este id foi encontrado!");
        }
        res.send({success: true, user: user});        
    } catch (error) {
        res.send({success: false, message: error.message});    
    }   
}

exports.updateUser = async (req, res) => { 
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(422).send({ errors: validationErrors.array() });
    }
    
    try {        
        const result = await User.updateOne(
            {_id: req.params.id},
            {$set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        });       
        
        if (result.n === 0) {
            throw new Error("Nenhum usuário encontrado para atualização!");
        }
        
        if (result.nModified === 0) {
            throw new Error("Erro ao atualizar!");
        }
        res.send({success: true, message: "Usuário atualizado com sucesso!"});        
    } catch (error) {
        res.send({success: false, message: error.message});    
    }   
}

exports.removeUser = async (req, res) => { 
    try {        
        const result = await User.deleteOne({_id: req.params.id});       
        if (result.deletedCount === 0) {
            throw new Error("Erro ao remover usuário!");
        }
        res.send({success: true, message: "Usuário removido com sucesso!"});        
    } catch (error) {
        res.send({success: false, message: error.message});    
    }   
}