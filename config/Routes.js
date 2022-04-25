const express = require('express');
const app = express();
const router = express.Router();
const ejs = require('ejs');
const bodyParser = require('body-parser');



//Routes
const HomeRouter = require("../controllers/HomeController"); //Home

//Configure More Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static(__dirname));

//Render Router
app.use(HomeRouter);

module.exports = app;