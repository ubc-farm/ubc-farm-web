/**
 * Created by Xingyu on 7/5/2017.
 */
const mongoose = require('mongoose');

// define the Pesticide model schema
const EquipmentSchema = new mongoose.Schema({

    name: String,
    price: Number,
    store: String,
    quantity: Number

});

module.exports = mongoose.model('Equipment', EquipmentSchema);