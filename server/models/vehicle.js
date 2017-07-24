/**
 * Created by Xingyu on 7/5/2017.
 */
const mongoose = require('mongoose');

// define the Pesticide model schema
const VehicleSchema = new mongoose.Schema({

    brand: String,
    model: String,
    year: Number,
    price: Number,
    quantity: Number

});

module.exports = mongoose.model('Vehicle', VehicleSchema);