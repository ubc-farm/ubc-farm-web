/**
 * Created by Xingyu on 7/5/2017.
 */
const mongoose = require('mongoose');

// define the Transplant model schema
const TransplantSchema = new mongoose.Schema({

    crop: String,
    variety: String,
    weight: Number,
    unit: String,
    quantity: Number,
    product: String,
    store: String,
    price: Number
});

module.exports = mongoose.model('Transplant', TransplantSchema);