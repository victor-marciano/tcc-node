const moment = require('moment');
const Diet = require('../models/Diet');
moment.locale('pt-Br');

exports.getDiet = async (req, res) => {
    try {
        const diet = await Diet.find();    
        res.send(diet);    
    } catch (error) {
        res.send(error);
    }
};

exports.newDiet = async (req, res) => {
    try {
        const startDiet = moment().toISOString();
        const endDiet = moment().add(1, 'm').toISOString();

        await Diet.create({
            name: req.body.name,
            start: startDiet,
            end: endDiet,
            user: req.body.user_id
        });    
        res.send({success: true, message: "Dieta criada com sucesso"});    
    } catch (error) {
        res.send({error: error.message, message: "Não foi possível inserir sua dieta, tente novamente mais tarde"});
    }
};

exports.removeDiet = async (req, res) => {
    try {        
        const result = await Diet.deleteOne({_id: req.params.id});       
        if (result.deletedCount === 0) {
            throw new Error("Erro ao remover dieta!");
        }
        return res.send({success: true, message: "Dieta removida com sucesso!"});        
    } catch (error) {
        return res.send({success: false, message: error.message});    
    }
};