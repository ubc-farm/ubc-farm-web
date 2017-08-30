/**
 * Created by Xingyu on 7/5/2017.
 */
const mongoose = require('mongoose');
let inventory_log_schema = require('./log_inventory');

// define the Vehicle model schema
const VehicleSchema = new mongoose.Schema({

    name: String,
    suppliers:[],
    log: [inventory_log_schema],
    quantity: Number,
    unit: String,

    brand: String,
    model: String,
    year: Number,
    price: Number,


});

module.exports = mongoose.model('Vehicle', VehicleSchema);