const mongoose = require("mongoose");

const profilSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    function: {type: String},
    action: {type: String},
    phone: {type: String},
    isAvaible:{type: Boolean, default: false},
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    idRole: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    idAgence: {type: mongoose.Schema.Types.ObjectId, ref: 'Agence'},
    idCaisse: {type: mongoose.Schema.Types.ObjectId, ref: 'Caisse'},
},
{timestamps: true})

const ProfilModel = mongoose.model('Profil', profilSchema)

module.exports = ProfilModel