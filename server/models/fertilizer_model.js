/**
 * Created by Xingyu on 7/5/2017.
 */
const mongoose = require('mongoose');

// define the Transplant model schema
const FertilizerSchema = new mongoose.Schema({

    type: String,
    name: String,
    rate: String,
    ratio: String,
    tc: Number,
    no3: Number,
    nh4: Number,
    k2o: Number,
    p2o5: Number,
    price: Number,
    quantity: Number,
});

module.exports = mongoose.model('Fertilizer', FertilizerSchema);