const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nutrimars', { useUnifiedTopology: true, useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
    // cellphone: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;