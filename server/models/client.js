/**
 * Created by Xingyu on 11/9/2017.
 */
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: String,
    address: {
        number: Number,
        street: String,
        postal: String,
        city: String,
    },
    telephone: Number,
});

module.exports = mongoose.model('Client', ClientSchema);