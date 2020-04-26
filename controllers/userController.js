const User = require('../models/User');
const argon2 = require('argon2');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const moment = require('moment');
moment.locale('pt_Br');

exports.newUser = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).send({ errors: validationErrors.array() });
    } 

    try {        
        const hashedPassword = await argon2.hash(req.body.password);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            created: moment().toISOString()                   
        });        
        return res.send({success: true, message: "Usuário cadastrado com sucesso!"});        
    } catch (error) {
        return res.send({success: false, message: "Erro ao cadastrar usuário!", error: error});    
    }   
}

exports.authUser = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).send({ errors: validationErrors.array() });
    } 

    try {        
        const user = await User.findOne({ email: req.body.email }).select('+password');

        if (!user) {
            return res.status(400).send({ message: "Nenhum usuário com este email foi encontrado" });
        }

        if (!await argon2.verify(user.password, req.body.password)) {
            return res.status(401).send({ message: "Senha incorreta!" });
        } 

        user.set('password', undefined, { strict: false });
        const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
        await user.updateOne({ lastLogin: moment().toISOString() });
        return res.json({ accessToken: accessToken, message: "Autenticado com sucesso!", user: user });    
    } catch (error) {
        return res.send({ success: false, message: "Erro ao cadastrar usuário!", error: error.message });    
    }   
}

exports.getUsers = async (req, res) => { 
    try {        
        const users = await User.find();
        return res.send({success: true, users: users});        
    } catch (error) {
        return res.send({success: false, message: "Erro ao cadastrar usuário!", error: error});    
    }   
}

exports.getOneUser = async (req, res) => { 
    try {        
        const user = await User.findOne({_id: req.params.id});
        if (!user) {
            throw new Error("Nenhum usuário com este id foi encontrado!");
        }
        return res.send({success: true, user: user});        
    } catch (error) {
        return res.send({success: false, message: error.message});    
    }   
}

exports.updateUser = async (req, res) => { 
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).send({ errors: validationErrors.array() });
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
        return res.send({success: true, message: "Usuário atualizado com sucesso!"});        
    } catch (error) {
        return res.send({success: false, message: error.message});    
    }   
}

exports.removeUser = async (req, res) => { 
    try {        
        const result = await User.deleteOne({_id: req.params.id});       
        if (result.deletedCount === 0) {
            throw new Error("Erro ao remover usuário!");
        }
        return res.send({success: true, message: "Usuário removido com sucesso!"});        
    } catch (error) {
        return res.send({success: false, message: error.message});    
    }   
}