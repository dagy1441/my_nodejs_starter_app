const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    name: {type: String},
    status:{type: Boolean, default: true}
},
{timestamps: true})

const RoleModel = mongoose.model('Role', roleSchema)

module.exports = RoleModel
