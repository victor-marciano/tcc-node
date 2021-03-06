const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/nutrimars', {
     useUnifiedTopology: true,
     useNewUrlParser: true 
});

const userSeeder = require('./seeders/userSeeder');
const articleSeeder = require('./seeders/articleSeeder');

userSeeder.run();
articleSeeder.run();
