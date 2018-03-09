/**
 * Created by Xingyu on 1/04/2018.
 */
const mongoose = require('mongoose');
const User = require('./user.js');

const TaskLogSchema = new mongoose.Schema({
    taskId: String,
    userName: String,
    date: Date,
    hours: Number,
    description: String,
    items: [],
});

module.exports = mongoose.model('TaskLog', TaskLogSchema);