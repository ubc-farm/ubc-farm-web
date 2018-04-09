/**
 * Created by Xingyu on 7/5/2017.
 */
const mongoose = require('mongoose');
let inventory_log_schema = require('./log_inventory');

// define the Transplant model schema
const FertilizerSchema = new mongoose.Schema({

    name: String,
    suppliers:[],
    log: [inventory_log_schema],
    quantity: Number,
    unit: String,

    type: String,
    rate: String,
    ratio: String,
    tc: Number,
    no3: Number,
    nh4: Number,
    k2o: Number,
    p2o5: Number,
    price: Number,
    currency: String
});

module.exports = mongoose.model('Fertilizer', FertilizerSchema);