const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
    name: String,
    start: Date,
    end: Date,
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    meal: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meal',
            required: false
        }
    ]
}, { collection: 'diet' });

dietSchema.statics.addMealsToDiet = async (diet_id, meals) => {
    let diet = await mongoose.model('Diet').findOne(diet_id);
    for (const meal in meals) {
        diet.meal.push(meals[meal]._id);
    }
    return await diet.save(); 
}

const diet = mongoose.model('Diet', dietSchema);

module.exports = diet;