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

const diet = mongoose.model('Diet', dietSchema);

module.exports = diet;