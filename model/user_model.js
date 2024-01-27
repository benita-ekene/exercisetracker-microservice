const { Schema, model }  = require("mongoose");

const UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  
})

module.exports = model('User', UserSchema)

