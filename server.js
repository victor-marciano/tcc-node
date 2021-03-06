const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const connection = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/nutrimars';
mongoose.connect(connection, {    
    useNewUrlParser: true 
}).then(() => console.log('Conectado ao MongoDB!'))
.catch(err => {
    console.log(Error, err.message);
});;

app.use(cors());

const bodyParser = require('body-parser');
const articleRoute = require("./routes/articles");
const userRoute = require("./routes/user");
const foodRoute = require("./routes/food");
const dietRoute = require("./routes/diet");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(articleRoute);
app.use(userRoute);
app.use(foodRoute);
app.use(dietRoute);


const port = process.env.PORT || '3000';

app.listen(port, () => {
    console.log(`listening on port ${port}`);    
})
