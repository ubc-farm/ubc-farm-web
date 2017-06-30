/**
 * Created by Xingyu on 6/29/2017.
 */
const mongoose = require('mongoose');

// define the User model schema
const SeedSchema = new mongoose.Schema({
    crop: String,
    variety: String,
    name: String,
    weight: Number,
    unit: String,
    quantity: Number
});

module.exports = mongoose.model('Seed', SeedSchema);