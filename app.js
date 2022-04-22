const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const contasRoute = require('./controllers/HomeController');

//Configure Routes
contasRoute(app);

//Configure Paths
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static(__dirname));

//Configure Server
app.listen(process.env.port || 3000);

console.log('http://localhost/3000');