const { Schema, model }  = require("mongoose");

const UserSchema = new Schema({
  username: {type: String, required: true, unique: true}, 
  timestamps: { type: Date, default: Date.now },
})

// const UserSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   timestamps: { type: Date, default: Date.now },
// });


module.exports = model('User', UserSchema)

