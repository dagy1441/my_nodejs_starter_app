const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    postalCode: {
        type: String
    },
    idCountry: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'country'
    },
    active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
});

const AddressModel = mongoose.model('Address', AddressSchema);

module.exports = AddressModel  