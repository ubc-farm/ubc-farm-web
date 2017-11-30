/**
 * Created by Xingyu on 11/23/2017.
 */
const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    purchaseNumber: Number,
    date: Date,
    supplierID: String,
    itemSummary: [],
    subtotal: Number,
    total: Number,
});

module.exports = mongoose.model('Purchase', PurchaseSchema);