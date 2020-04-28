const moment = require('moment');
const Diet = require('../models/Diet');
const User = require('../models/User');
const Meal = require('../models/Meal');
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
        const diet = await Diet.create({
            name: req.body.name, start: req.body.start, end: req.body.end, user: req.body.user
        });           
        const meals = await Meal.mountMeal(req.body.meal, diet._id);
        await Diet.addMealsToDiet(diet._id, meals);           
        await User.addDietToUser(diet.user, diet._id);       
        
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

exports.systemNewDiet = async (req, res) => {
    const startDiet = moment().toISOString();
    const endDiet = moment().add(1, 'm').toISOString();

    try {
        const diet = await Diet.create({
            name: `Dieta gerada pelo Sistema`, start: startDiet, end: endDiet, user: req.params.user_id 
        });       
                   
        // const meals = await Meal.mountMeal(req.body.meal, diet._id);
        // await Diet.addMealsToDiet(diet._id, meals);           
        // await User.addDietToUser(diet.user, diet._id);

        return res.send({success: true, message: "Dieta gerada com sucesso!"});
    } catch (error) {
        return res.send({success: false, message: "Erro ao gerar dieta, tente novamente mais tarde!", error: error.message});
    }
}
