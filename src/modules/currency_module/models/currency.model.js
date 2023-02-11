const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    code: {
        type: String
    }, 
    label: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
}, {timestamps: true});

const CurrencyModel = mongoose.model('Currency', currencySchema);

 module.exports = CurrencyModel