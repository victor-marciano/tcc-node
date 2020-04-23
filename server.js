const express = require('express');
const app = express();
require('dotenv').config({ debug: process.env.DEBUG });
const cors = require('cors');
const mongoose = require('mongoose');
const connection = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/nutrimars';
mongoose.connect(connection, {
    useUnifiedTopology: true,
    useNewUrlParser: true 
}).then(() => console.log('Conectado ao MongoDB!'))
.catch(err => {
    console.log(Error, err.message);
});;

const bodyParser = require('body-parser');
const articleRoute = require("./routes/articles");
const userRoute = require("./routes/user");
const foodRoute = require("./routes/food");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(articleRoute);
app.use(userRoute);
app.use(foodRoute);
app.use(cors());

const port = process.env.PORT || '3000';

app.listen(port, () => {
    console.log(`listening on port ${port}`);    
})
