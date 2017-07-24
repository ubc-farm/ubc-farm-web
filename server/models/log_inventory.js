/**
 * Created by Xingyu on 7/12/2017.
 */
const mongoose = require('mongoose');

// define the Pesticide model schema
const InventoryLogSchema = new mongoose.Schema({

    timestamp: Date,
    value: Number,
});

module.exports = InventoryLogSchema;