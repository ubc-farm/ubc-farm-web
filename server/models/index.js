/*
**Author: Xingyu Tao
**Last Updated: 5-15-2017
**Comments: 
**	database connection module
*/
const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  mongoose.connect(uri);
  // plug in the promise library:
  mongoose.Promise = global.Promise;


  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  // load models
  require('./user');
  require('./field');
  require('./seed');
  require('./task');
  require('./equipment');
  require('./harvest');
  require('./pestControl');
  require('./transplant');
  require('./vehicle');
  require('./fertilizer_model');
  require('./log_inventory');
  require('./supplier');
};