var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan'); //Setup the development enviorment
var config = require('./config'); //obtain the global  config file

// Get and define request parameters by using bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Provide logging capacity
//TODO We should remove this for production
app.use(morgan('dev'));

// Start the server and listen out to requests
app.listen(config.port);
console.log('I will be watching: http://yourip:' + config.port);

// Bundle our routes for the app
app.use('/app_api', require('./app_api/routes/router'));
