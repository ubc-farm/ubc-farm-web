/*
**Author: Xingyu Tao
**Last Updated: 5-15-2017
**Comments: app entry point
*/
import path from 'path';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';


const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');


// connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler,{
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

// static files locations
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

//passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// pass the check field middleware
// const checkField = require('./server/middleware/submit-field');
// app.use('/data', checkField);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
const dataRoutes = require('./server/routes/data');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/data', dataRoutes);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './server/static/index.html'));
});

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});