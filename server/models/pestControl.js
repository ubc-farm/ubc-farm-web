/**
 * Created by Xingyu on 7/5/2017.
 */
const mongoose = require('mongoose');
let inventory_log_schema = require('./log_inventory');

// define the Pesticide model schema
const PesticideSchema = new mongoose.Schema({

    name: String,
    suppliers:[],
    log: [inventory_log_schema],
    quantity: Number,
    unit: String,

    type: String,
    rate: Number,
    ratio: String,
    location: String,
    entry: Number,
    harvest: Number,
    price:Number,
    currency:String,
    active: String,
    percentage: Number

});

module.exports = mongoose.model('Pesticide', PesticideSchema);