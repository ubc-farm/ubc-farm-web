/**
 * Created by Xingyu on 7/26/2017.
 */
const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    name: String,
    address: {},
    telephone: Number,
    quantity: Number,
    unit: String,
    per_unit_quantity: Number,
    per_unit_unit: String,
});

module.exports = mongoose.model('Supplier', SupplierSchema);