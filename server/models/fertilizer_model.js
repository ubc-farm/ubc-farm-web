/**
 * Created by Xingyu on 7/5/2017.
 */
const mongoose = require('mongoose');
let inventory_log_schema = require('./log_inventory');

// define the Transplant model schema
const FertilizerSchema = new mongoose.Schema({

    name: String,
    log: [inventory_log_schema],
    quantity: Number,
    quantityUnit:String,
    unit: String,

    type: String,
    tc: Number,
    no3: Number,
    nh4: Number,
    k2o: Number,
    p2o5: Number,
    h20:Number,
    price: Number,
    location:String,
    currency: String
});

module.exports = mongoose.model('Fertilizer', FertilizerSchema);