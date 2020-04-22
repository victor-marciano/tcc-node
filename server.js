const express = require('express');
const app = express();
require('dotenv').config({ debug: process.env.DEBUG });
const cors = require('cors');
const mongoose = require('mongoose');
const connection = process.env.MONGODB_URI || 'mongodb://localhost:27017/nutrimars';
mongoose.connect(connection, { useUnifiedTopology: true, useNewUrlParser: true });

const bodyParser = require('body-parser');
const articleRoute = require("./routes/articles");
const userRoute = require("./routes/user");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(articleRoute);
app.use(userRoute);
app.use(cors());

const port = process.env.PORT || '3000';

app.listen(port, () => {
    console.log(`listening on port ${port}`);    
})