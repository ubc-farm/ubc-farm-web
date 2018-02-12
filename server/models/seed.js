/**
 * Created by Xingyu on 6/29/2017.
 */
const mongoose = require('mongoose');
let inventory_log_schema = require('./log_inventory');

// define the Seed model schema
const SeedSchema = new mongoose.Schema({

    name: String,
    log: [inventory_log_schema],
    quantity: Number,
    unit: String,

    crop: String,
    variety: String,
    weight: Number,
    product: String,
    store: String,
    price: Number,
    currency:String
});

module.exports = mongoose.model('Seed', SeedSchema);