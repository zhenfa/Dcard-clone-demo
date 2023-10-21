var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();

const router = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Router 
app.use('/api', router);

// All api url mapping fail
app.use(function(req, res, next) {
  next(createError(403));
});

module.exports = app;
