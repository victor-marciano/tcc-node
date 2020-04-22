const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    // cellphone: String
    articles: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Article'
    }
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

module.exports = User;