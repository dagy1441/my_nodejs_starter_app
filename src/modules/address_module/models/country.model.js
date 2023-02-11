const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    code: {
        type: String
    },
    shortLabel: {
        type: String
    },
    longLabel: {
        type: String
    },
    city: {
        name: { 
            type: String 
        },
        street: { 
            name: { 
                type: String 
            },
         },
    },
    idCurrency: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'currency'
    },
    active: {
        type: Boolean
    },
}, { 
    timestamps: true,
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
});

const CountryModel = mongoose.model('country', CountrySchema);

module.exports = CountryModel  