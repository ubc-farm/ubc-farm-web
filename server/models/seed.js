/**
 * Created by Xingyu on 6/29/2017.
 */
const mongoose = require('mongoose');

// define the User model schema
const SeedSchema = new mongoose.Schema({

    crop: String,
    variety: String,
    weight: Number,
    unit: Number,
    quantity: Number,
    product: String,
    store: String,
    price: Number
});

module.exports = mongoose.model('Seed', SeedSchema);