/**
 * Created by Xingyu on 7/5/2017.
 */
const mongoose = require('mongoose');
let inventory_log_schema = require('./log_inventory');

// define the Pesticide model schema
const HarvestedSchema = new mongoose.Schema({

    name: String,
    suppliers:[],
    log: [inventory_log_schema],
    quantity: Number,
    unit: String,
    location:String,
    variety: String,
    price: Number,

});

module.exports = mongoose.model('Harvested', HarvestedSchema);