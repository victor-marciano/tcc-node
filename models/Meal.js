const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: String,
    schedule: Date,    
    
    food: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            required: true
        }
    ],

    diet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diet',
        required: true
    }
}, { collection: 'meal' });

const meal = mongoose.model('Meal', mealSchema);

module.exports = meal;