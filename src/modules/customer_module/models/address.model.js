const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    street: {type: String},
    postalCode: {type: String},
    city: {type: String},
    country: {type: String}
});

const AddressModel = mongoose.model('addressDocs', AddressSchema);

module.exports = AddressModel  