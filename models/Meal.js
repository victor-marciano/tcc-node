const mongoose = require('mongoose');
const foodSchema = require('./Food').schema

const mealSchema = new mongoose.Schema({
    name: String,
    schedule: Date,    
    
    food: [
        {
            type: foodSchema,
            ref: 'Food',
            required: true
        }
    ],

    diet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diet',
        required: true
    }
}, { collection: 'meals' });

mealSchema.statics.mountMeal = (meals, diet_id) => {
    for (const meal in meals) {
        Object.assign(meals[meal], { diet: diet_id.toString() });
    }    
    return mongoose.model('Meal').insertMany(meals);
}

const meal = mongoose.model('Meal', mealSchema);

module.exports = meal;