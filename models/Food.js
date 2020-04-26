const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: String,
    kcal: Number,
    carbs: Number,
    protein: Number,
    fats: Number,
    
    qty: {
        type: Number,
        required: false
    },
    
    meal: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meal',
            required: false
        }
    ]
}, { collection: 'food' });

const food = mongoose.model('Food', foodSchema);

module.exports = food;