const Meal = require('../models/Meal');

exports.getMeal = async (req, res) => {
    try {
        const meal = await Meal.find();    
        res.send(meal);    
    } catch (error) {
        res.send(error);
    }
};