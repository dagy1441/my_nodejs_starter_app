const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    login: {type: String, required: true },
    password:{type: String, required: true },
    token: { type: String },
    active: { type: Boolean, default: false },
    status:{type: Number, default: 0},
    firstConnection: {
        type: Boolean,
        default: true,
    },
    type: {
        type: String,
        enum: ["SUPER_ADMIN", "ADMIN", "EMPLOYER", "CLIENT", "NOT_CLIENT"],
        default: "SUPER_ADMIN",
    },
})

const UserModel = mongoose.model('User', userSchema)
// class UserSet extends MongoHelper{
//     constructor(){
//         this.deFaultModel = new UserModel();
//     }

// }
module.exports = UserModel
