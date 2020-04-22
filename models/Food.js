const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: String,
    kcal: Number,
    carbs: Number,
    protein: Number,
    fats: Number
}, { collection: 'food' });

const food = mongoose.model('Food', foodSchema);

module.exports = food;