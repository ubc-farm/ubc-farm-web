/**
 * Created by Xingyu on 6/1/2017.
 */
const mongoose = require('mongoose');
const User = require('./user.js');

// define the User model schema
const TaskSchema = new mongoose.Schema({
    field: mongoose.Schema.ObjectId,
    type: String,
    description: String,
    logged: Boolean,
    logtext: String,
    user: {type: Number, ref:'User'},
    time: Date
});

module.exports = mongoose.model('Task', TaskSchema);