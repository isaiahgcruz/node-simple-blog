const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes')
const config = require('./config.js');
const middlewares = require('./middlewares')

/**
 * Express configuration
 */
const app = express();
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Jade configuration (To be removed)
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * CORS Configuration
 */
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));
app.options('*', cors());

/**
 * Register routes and middlewares
 */
app.use(middlewares.auth);
app.use(routes);
app.use(middlewares.notFoundHandler);
app.use(middlewares.errorHandler);

/**
 * MongoDB Configuration
 */
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, function(error) {
  if (error) {
    console.error('Please make sure that MongoDB is running');
    throw error;
  }
});

module.exports = app;
