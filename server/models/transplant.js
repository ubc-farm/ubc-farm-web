/**
 * Created by Xingyu on 7/5/2017.
 */
const mongoose = require('mongoose');
let inventory_log_schema = require('./log_inventory');

// define the Transplant model schema
const TransplantSchema = new mongoose.Schema({

    name: String,
    suppliers:[],
    log: [inventory_log_schema],
    quantity: Number,
    unit: String,

    crop: String,
    variety: String,
    weight: Number,
    product: String,
    store: String,
    price: Number
});

module.exports = mongoose.model('Transplant', TransplantSchema);