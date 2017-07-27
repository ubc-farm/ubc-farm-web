/**
 * Created by Xingyu on 7/5/2017.
 */
const mongoose = require('mongoose');
let inventory_log_schema = require('./log_inventory');


// define the Pesticide model schema
const EquipmentSchema = new mongoose.Schema({

    name: String,
    quantity: Number,
    unit: String,
    suppliers:[],
    log: [inventory_log_schema],

});

module.exports = mongoose.model('Equipment', EquipmentSchema);