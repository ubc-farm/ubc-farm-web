/**
 * Created by Xingyu on 5/26/2017.
 */
const mongoose = require('mongoose');

// define the User model schema
const FieldSchema = new mongoose.Schema({
    name: String,
    polygon: []
});

module.exports = mongoose.model('Field', FieldSchema);