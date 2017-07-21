/**
 * Created by Xingyu on 7/5/2017.
 */
const mongoose = require('mongoose');

// define the Pesticide model schema
const PesticideSchema = new mongoose.Schema({

    type: String,
    name: String,
    rate: Number,
    ratio: String,
    location: String,
    entry: Number,
    harvest: Number,
    active: String,
    percentage: Number

});

module.exports = mongoose.model('Pesticide', PesticideSchema);