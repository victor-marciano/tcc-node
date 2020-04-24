const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
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
    // cellphone: String
    articles: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Article'
    }
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

module.exports = User;