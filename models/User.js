const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: false,
    }, 

    avatarUrl: {
        type: String,
        required: false
    }, 

    created: {
        type: Date,
        required: true
    },

    lastLogin: {
        type: Date,
        required: false
    }, 

    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article'
        }
    ],

    diet: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Diet'
        }
    ]

}, { collection: 'users' });

userSchema.statics.addDietToUser = (user_id, diet_id) => {
    return mongoose.model('User').findByIdAndUpdate(user_id, {
        $push: {
          diet: diet_id 
        }
    }, { new: true, useFindAndModify: false });
}

const User = mongoose.model('User', userSchema);

module.exports = User;