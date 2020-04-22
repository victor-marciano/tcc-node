const express = require('express');
const app = express();
require('dotenv').config({ debug: process.env.DEBUG });

const bodyParser = require('body-parser');
const articleRoute = require("./routes/articles");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(articleRoute);

const port = process.env.PORT || '3000';

app.listen(port, () => {
    console.log(`listening on port ${port}`);    
})