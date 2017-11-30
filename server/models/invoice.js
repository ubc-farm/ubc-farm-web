/**
 * Created by Xingyu on 11/23/2017.
 */
const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    invoiceNumber: Number,
    date: Date,
    clientID: String,
    itemSummary: [],
    subtotal: Number,
    total: Number,
});

module.exports = mongoose.model('Invoice', InvoiceSchema);