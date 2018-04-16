/**
 * Created by Xingyu on 7/5/2017.
 */
const mongoose = require('mongoose');
let inventory_log_schema = require('./log_inventory');


// define the Equipment model schema
const EquipmentSchema = new mongoose.Schema({

    name: String,
    suppliers:[],
    log: [inventory_log_schema],
    quantity: Number,
    location:String,
    unit: String,

});

module.exports = mongoose.model('Equipment', EquipmentSchema);