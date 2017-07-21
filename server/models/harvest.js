/**
 * Created by Xingyu on 7/5/2017.
 */
const mongoose = require('mongoose');

// define the Pesticide model schema
const HarvestedSchema = new mongoose.Schema({

    name: String,
    variety: String,
    price: Number,
    quantity: Number,
    unit: String,

});

module.exports = mongoose.model('Harvested', HarvestedSchema);