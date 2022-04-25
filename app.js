const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Rotas
const contasRoute = require('./controllers/HomeController');

//Configure EJS
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

//Configure Paths
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static(__dirname));

//Configure Routes
app.use(contasRoute)

//Configure Server
app.listen(process.env.port || 3000);

console.log('http://localhost/3000');