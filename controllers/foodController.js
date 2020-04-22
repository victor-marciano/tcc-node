const Food = require('../models/Food');

exports.getFood = async (req, res) => {
    try {
        const food = await Food.find();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(food);    
    } catch (error) {
        res.send(error);
    }
};