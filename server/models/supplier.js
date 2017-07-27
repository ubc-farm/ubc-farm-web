/**
 * Created by Xingyu on 7/26/2017.
 */
const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    name: String,
    address: {
        number: Number,
        street: String,
        postal: String,
        city: String,
    },
    telephone: Number,
});

module.exports = mongoose.model('Supplier', SupplierSchema);