/**
 * Created by Xingyu on 5/26/2017.
 */
const mongoose = require('mongoose');
const Task = require('./task');

// define the User model schema
const FieldSchema = new mongoose.Schema({
    name: String,
    polygon: [],
    tasks: [{type: Number, ref: 'Task'}]
});

module.exports = mongoose.model('Field', FieldSchema);